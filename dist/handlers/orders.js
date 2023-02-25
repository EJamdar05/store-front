"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const auth_1 = __importDefault(require("../middleware/auth"));
const orderRoutes = (app) => {
    app.get('/orders/:id', auth_1.default, orders);
    app.get('/orders', auth_1.default, index);
    app.post('/orders', auth_1.default, create);
    app.delete('/orders/:id', auth_1.default, destroy);
    app.post('/orders/currentOrder', auth_1.default, current);
    app.post('/orders/:id/products', auth_1.default, addItem);
};
const store = new orders_1.OrderStore();
const orders = async (req, res) => {
    const orders = await store.show(req.body.id);
    res.json(orders);
};
const index = async (req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            user_id: req.body.uid,
            order_status: req.body.ostat,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleteUser = await store.delete(req.body.id);
        res.json(deleteUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const current = async (req, res) => {
    try {
        const orders = await store.currentOrder(req.body.id);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addItem = async (req, res) => {
    try {
        const item = {
            order_id: req.body.oid,
            product_id: req.body.pid,
            quantity: req.body.quant,
        };
        const add = await store.createProduct(item);
        res.json(add);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.default = orderRoutes;
