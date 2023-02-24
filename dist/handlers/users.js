"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/{:id}', show);
    app.post('/users', create);
    app.delete('/users', destroy);
    app.post('/users/authenticate', authenticate);
};
const store = new users_1.UserStore();
const index = async (req, res) => {
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
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.body.id);
    res.json(user);
};
const create = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password_digest: req.body.password
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json({ err });
    }
};
const destroy = async (req, res) => {
    const deleteUser = await store.delete(req.body.id);
    res.json(deleteUser);
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password_digest: req.body.password
    };
    try {
        const result = await store.authentication(user?.username, user?.password_digest);
        const token = jsonwebtoken_1.default.sign({ user: result }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json({ err });
    }
};
exports.default = userRoutes;
