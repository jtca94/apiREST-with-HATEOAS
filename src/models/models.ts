import { pool } from '../database/database';
import { Item, Filtros } from '../types/types';
import { filterFunction } from '../utils/utils';
import format from 'pg-format';



const findDataFilters = async (filters: Filtros): Promise<Item[]> => {
    let query = 'SELECT * FROM inventario';
    const queryValuesArray: string[] = [];

   if (filters) {
    const functionResults = filterFunction(filters);
    query = functionResults.query;
    queryValuesArray.push(...functionResults.queryValuesArray);
    }
    query = format(query, ...queryValuesArray);
    console.log(query)
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
        throw new Error('404a');
    }

    return rows;
};



const findData = async (offset: number, limit: number, sort: any): Promise<Item[]> => {
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