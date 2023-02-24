"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orderRoutes = (app) => {
    app.get('/orders/{:id}', orders);
    app.get('/orders', index);
    app.post('/orders', create);
    app.delete('/orders/{:id}', destroy);
    app.post('/orders/currentOrder', current);
};
const store = new orders_1.OrderStore();
const orders = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid credentials.');
        return;
    }
    const orders = await store.show(req.body.id);
    res.json(orders);
};
const index = async (req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const create = async (req, res) => {
    const order = {
        product_id: req.body.id,
        quantity: req.body.quantity,
        user_id: req.body.uid,
        order_status: req.body.ostat
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
};
const destroy = async (req, res) => {
    const deleteUser = await store.delete(req.body.id);
    res.json(deleteUser);
};
const current = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status ?? (401);
        res.json('Access denied, invalid token');
    }
    const orders = await store.currentOrder(req.body.id);
    res.json(orders);
};
exports.default = orderRoutes;
