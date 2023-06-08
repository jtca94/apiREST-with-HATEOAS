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

export type Categoria = "anillo" | "collar" | "pulsera" | "reloj";
export type Metal = "oro" | "plata" | "platino" | "acero";

export interface SearchQuery {
    min: number;
    max: number;
    categoria: Categoria;
    metal: Metal;
};