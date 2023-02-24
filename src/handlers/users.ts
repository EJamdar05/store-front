import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';
const userRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users', destroy);
    app.post('/users/authenticate', authenticate);
};

const store = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const auth = req.headers.authorization;
        jwt.verify(auth as string, process.env.TOKEN_SECRET as string);
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const users = await store.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.body.id);
    res.json(user);
};

const create = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password_digest: req.body.password,
    };
    console.log(req.body);
    try {
        const newUser = await store.create(user);
        const token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as string,
        );
        res.json(token);
    } catch (err) {
        res.status(401);
        res.json({ err });
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleteUser = await store.delete(req.body.id);
    res.json(deleteUser);
};

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username as string,
        password_digest: req.body.password as string,
    };
    try {
        const result = await store.authentication(
            user?.username,
            user?.password_digest,
        );
        const token = jwt.sign(
            { user: result },
            process.env.TOKEN_SECRET as string,
        );
        res.json(token);
    } catch (err) {
        res.status(401);
        res.json({ err });
    }
};

export default userRoutes;
