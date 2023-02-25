"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_prod_1 = require("../models/order_prod");
const auth_1 = __importDefault(require("../middleware/auth"));
const orderProductsRoutes = (app) => {
    app.get('/orderprod', index);
    app.get('/orderprod/:id', show);
    app.post('/orderprod', auth_1.default, create);
};
const store = new order_prod_1.orderProdStore();
const index = async (req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.body.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const item = {
            order_id: req.body.oid,
            product_id: req.body.pid,
            quantity: req.body.quant,
        };
        const add = await store.create(item);
        res.json(add);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.default = orderProductsRoutes;
