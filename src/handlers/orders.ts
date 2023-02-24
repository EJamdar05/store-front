import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import jwt from 'jsonwebtoken';

const orderRoutes = (app: express.Application) => {
    app.get('/orders/{:id}', orders);
    app.get('/orders', index);
    app.post('/orders', create);
    app.delete('/orders/{:id}', destroy);
    app.post('/orders/currentOrder', current);
};
const store = new OrderStore();
const orders = async (req: Request, res: Response) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid credentials.');
        return;
    }
    const orders = await store.show(req.body.id);
    res.json(orders);
};

const index = async (req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const create = async (req: Request, res: Response) => {
    const order: Order = {
        product_id: req.body.id,
        quantity: req.body.quantity,
        user_id: req.body.uid,
        order_status: req.body.ostat,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
};

const destroy = async (req: Request, res: Response) => {
    const deleteUser = await store.delete(req.body.id);
    res.json(deleteUser);
};

const current = async (req: Request, res: Response) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    } catch (err) {
        res.status ?? 401;
        res.json('Access denied, invalid token');
    }
    const orders = await store.currentOrder(req.body.id);
    res.json(orders);
};

export default orderRoutes;
