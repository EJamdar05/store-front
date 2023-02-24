"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orderRoutes = (app) => {
    app.get('/orders/{:id}', orders);
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
exports.default = orderRoutes;
