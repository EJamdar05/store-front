"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/product/{:id}', show);
    app.post('/product', create);
};
const store = new products_1.ProductStore();
const index = async (req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.body.id);
    res.json(product);
};
const create = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const product = {
        prod_name: req.body.name,
        price: req.body.price
    };
    const created = await store.create(product);
    res.status(200);
    res.json(created);
};
exports.default = productRoutes;
