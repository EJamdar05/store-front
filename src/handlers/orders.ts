import express, {Request, Response} from 'express';
import {Order, OrderStore} from '../models/orders';
import jwt from 'jsonwebtoken';

const orderRoutes = (app: express.Application)=>{
    app.get('/orders/{:id}', orders);
}
const store = new OrderStore();
const orders = async(req: Request, res: Response)=>{
    try{
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    }catch(err){
        res.status(401);
        res.json('Access denied, invalid credentials.');
        return;
    }
    const orders = await store.show(req.body.id);
    res.json(orders);
}

export default orderRoutes;