import { pool } from '../database/database';
import { Item, SearchQuery } from '../types/types';
import format from 'pg-format';

const findDataFilters = async (filtros: SearchQuery): Promise<Item[]> => {
    let query = 'SELECT * FROM inventario';
    const queryValuesArray = [];
    const { min, max, categoria, metal } = filtros;
    if (min > max || min < 0 || max < 0) {
        throw new Error('outOfRange');
    }

    console.log(min, max, categoria, metal)
    if (categoria) {
        queryValuesArray.push(categoria);
        query += " WHERE categoria=%L";
    }
    if (metal) {
        queryValuesArray.push(metal);
        query += ' AND metal=%L';
    }
    if (min && max) {
        queryValuesArray.push(min, max);
        query += ' AND precio BETWEEN %L AND %L';
    }
    if (min && !max) {
        queryValuesArray.push(min);
        query += ' AND precio >= %L';
    }
    if (max && !min) {
        queryValuesArray.push(max);
        query += ' AND precio <= %L';
    }
    // se envien o no parametros, se ordena por id ascendentemente
    query += ' ORDER BY id ASC';
    query = format(query, ...queryValuesArray); 
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
        throw new Error('404a');
    }
    return rows;
};


const findData = async (offset: number, limit: number, sort:any): Promise<Item[]> => {
    let query = 'SELECT * FROM inventario';
    const queryValuesArray = [];
    // si no se envian parametros, se ordena por id ascendentemente
    // no agrego try and catch porque ya lo tengo en el controlador, si hay un error se captura ahi o en el middleware
    if (!sort && !limit && !offset) {
        query += ' ORDER BY id ASC';
    }
    if (sort) {
        const [property] = Object.keys(sort);
        queryValuesArray.push(property, sort[property]);
        query += ' ORDER BY %I %s';
    }
    if (limit) {
        queryValuesArray.push(limit);
        query += ' LIMIT %L';
    }
    if (offset) {
        queryValuesArray.push(offset);
        query += ' OFFSET %L';
    }
    // como primer parametro recibe el query string, como segundo se reciben los valores a reemplazar, se usa spread operator para separar el array
    query = format(query, ...queryValuesArray);
    const { rows } = await pool.query(query);
    if (!rows[0]) {
        // 404a para registro fuera de boundaries
        throw new Error('404a');
    }
    return rows;
};


const findItemById = async (id: number): Promise<Item> => {
    const { rows } = await pool.query('SELECT * FROM inventario WHERE id = $1', [id]);
    if (!rows[0]) {
        throw new Error('404');
    }
    return rows[0];
};

export const models = {
    findData,
    findItemById,
    findDataFilters
}