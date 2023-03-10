"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const auth_1 = __importDefault(require("../middleware/auth"));
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/product', auth_1.default, create);
};
const store = new products_1.ProductStore();
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
        const product = {
            prod_name: req.body.name,
            price: req.body.price,
        };
        const created = await store.create(product);
        res.status(200);
        res.json(created);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.default = productRoutes;
