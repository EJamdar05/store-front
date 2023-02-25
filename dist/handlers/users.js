"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
const userRoutes = (app) => {
    app.get('/users', auth_1.default, index);
    app.get('/users/:id', auth_1.default, show);
    app.post('/users', create);
    app.delete('/users', auth_1.default, destroy);
    app.post('/users/authenticate', authenticate);
};
const store = new users_1.UserStore();
const index = async (req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.body.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password_digest: req.body.password,
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
    try {
        const deleteUser = await store.delete(req.body.id);
        res.json(deleteUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password_digest: req.body.password,
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
