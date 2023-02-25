import express, { Request, Response } from 'express';
import { OrderProd, orderProdStore } from '../models/order_prod';
import auth from '../middleware/auth';
const orderProductsRoutes = (app: express.Application) => {
    app.get('/orderprod', index);
    app.get('/orderprod/:id', show);
    app.post('/orderprod', auth, create);
};

const store = new orderProdStore();

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.body.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const item: OrderProd = {
            order_id: req.body.oid,
            product_id: req.body.pid,
            quantity: req.body.quant,
        };
        const add = await store.create(item);
        res.json(add);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default orderProductsRoutes;
