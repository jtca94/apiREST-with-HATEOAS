import { Filtros } from '../types/types';

export const filterFunction = (filters: Filtros) => {
    let query = 'SELECT * FROM inventario';
    const queryValuesArray: any[] = [];
    const filterConditions: { [key: string]: string } = {
        min: 'precio >= %L',
        max: 'precio <= %L',
        categoria: 'categoria = %L',
        metal: 'metal = %L',
    };

    const filterKeys = Object.keys(filters) as (keyof Filtros)[];

    const validFilterKeys = filterKeys.filter((filter) =>
        Object.keys(filterConditions).includes(filter)
    );

    if (validFilterKeys.length > 0) {
        query += ' WHERE';
        validFilterKeys.forEach((filter, index) => {
            const filterValue: any = filters[filter];

            queryValuesArray.push([filterValue]);
            query += ` ${filterConditions[filter]}`;

            if (index !== validFilterKeys.length - 1) {
                query += ' AND';
            }
        });
    }
    return { query, queryValuesArray };
};