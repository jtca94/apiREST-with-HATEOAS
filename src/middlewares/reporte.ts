import { NextFunction, Request, Response } from "express";
export const queryReporte = async (req: Request, _res: Response, next: NextFunction) => {
    //url completa
    const url = `http://localhost:3000${req.originalUrl}`;
    const method = req.method;
    const date = new Date().toLocaleString();

    console.log(`Se ha accedido a la ruta: ${url} \n
    Con el siguiente detalle: \n
    Metodo: ${method} \n
    Fecha: ${date} \n
    `);
    next();
};