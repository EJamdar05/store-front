import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import auth from '../middleware/auth';
const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/product', auth, create);
};

const store = new ProductStore();

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
        const product: Product = {
            prod_name: req.body.name,
            price: req.body.price as number,
        };
        const created = await store.create(product);
        res.status(200);
        res.json(created);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export default productRoutes;
