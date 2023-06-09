import { models } from "../models/models";
import { Request, Response } from "express";
import { Item } from "../types/types";
import { handleErrors } from "./errors";

const getAllItems = async (req: Request, res: Response) => {
    try {
        const filters = req.query;
        // typescript no permite pasar por parametro un valor undefined, por lo que se debe validar que no sea undefined
        const results = await models.findDataFilters(filters as any);
        return res.json(results);
    } catch (error: any) {
        const code: string = error.message;
        const { status, message } = handleErrors(code);
        return res.status(status).json({ message, status, ok: false });
    }
}

const getItemsHATEOAS = async (req: Request, res: Response) => {
    try {
        const { sort } = req.query;
        // por typescript se debe castear a number el query string antes de pasar por parametro, de lo contrario se toma como string
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const offset = (page - 1) * limit;
        // en este caso, no necesito limitar los items por defecto, de necesitar cambio a limit = 10 y lo almaceno como let para poder cambiarlo
        const results = await models.findData(offset, limit, sort);
        const items = results.map((item: Item) => {
            return {
                nombre: item.nombre,
                href: `http://localhost:3000/joyas/${item.id}`
            }
        })
        const totalStock = results.reduce((acc: number, item: Item) => {
            return acc + item.stock;
        }, 0)
        const totalItems = results.length;
        const response = {
            totalStock,
            totalItems,
            items
        }
        return res.status(200).json(response);
    } catch (error: any) {
        const code: string = error.message;
        const { status, message } = handleErrors(code);
        return res.status(status).json({ message, status, ok: false });
    }
};

const getItemById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await models.findItemById(id);
        return res.status(200).json(result);
    } catch (error: any) {
        const code: string = error.message;
        const { status, message } = handleErrors(code);
        return res.status(status).json({ message, status, ok: false });
    }
};

export const controllers = {
    getAllItems,
    getItemsHATEOAS,
    getItemById
}