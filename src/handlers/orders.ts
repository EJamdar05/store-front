import express, { Request, Response } from 'express';
import { Order, OrderStore, OrderProd } from '../models/orders';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';
const orderRoutes = (app: express.Application) => {
    app.get('/orders/:id', auth, orders);
    app.get('/orders', auth, index);
    app.post('/orders', auth, create);
    app.delete('/orders/:id', auth, destroy);
    app.post('/orders/currentOrder', auth, current);
    app.post('/orders/:id/products', auth, addItem);
};
const store = new OrderStore();
const orders = async (req: Request, res: Response) => {
    const orders = await store.show(req.body.id);
    res.json(orders);
};

const index = async (req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.uid,
            order_status: req.body.ostat,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const deleteUser = await store.delete(req.body.id);
        res.json(deleteUser);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const current = async (req: Request, res: Response) => {
    try {
        const orders = await store.currentOrder(req.body.id);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addItem = async (req: Request, res: Response) => {
    try {
        const item: OrderProd = {
            order_id: req.body.oid,
            product_id: req.body.pid,
            quantity: req.body.quant,
        };
        const add = await store.createProduct(item);
        res.json(add);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default orderRoutes;
