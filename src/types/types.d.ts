export interface Item {
    id: number;
    nombre: string;
    categoria: string;
    metal: string;
    precio: number;
    stock: number;
};

export interface ItemHATEOAS {
    nombre: string;
    href: string;
};


export interface Filtros {
    min: number;
    max: number;
    categoria: string;
    metal: string;
};

