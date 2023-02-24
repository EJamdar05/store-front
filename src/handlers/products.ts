import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import jwt from 'jsonwebtoken';

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/product/{:id}', show);
    app.post('/product', create);
};

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
};

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.body.id);
    res.json(product);
};

const create = async (req: Request, res: Response) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const product: Product = {
        prod_name: req.body.name,
        price: req.body.price as number,
    };
    const created = await store.create(product);
    res.status(200);
    res.json(created);
};

export default productRoutes;
