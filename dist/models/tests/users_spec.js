"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new users_1.UserStore();
const request = (0, supertest_1.default)(server_1.default);
const testUser = {
    firstname: 'Test',
    lastname: 'User',
    username: 'testuser',
    password_digest: 'letmein'
};
const token = jsonwebtoken_1.default.sign(testUser, process.env.TOKEN_SECRET);
describe('User model tests', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a destroy method', () => {
        expect(store.delete).toBeDefined();
    });
    it('should have a authenticate method', () => {
        expect(store.authentication).toBeDefined();
    });
    it('create method should add a user', async () => {
        const result = await store.create(testUser);
        expect(result).toEqual({
            firstname: 'Test',
            lastname: 'User',
            username: 'TestUser',
            password_digest: '354bner734bbbr732',
        });
    });
    it('should list all users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('should show a user', async () => {
        const result = await store.show('10');
        expect(result.firstname).toEqual('Test');
    });
});
describe('testing user endpoints', () => {
    describe('be able to reach the endpoint and confirm it exists', () => {
        it('reaches the index route', async () => {
            const res = await request.get('/users');
            expect(res.status).toBe(200);
        });
        it('reaches the show route', async () => {
            const res = await request.get('/users/10');
            expect(res.status).toBe(200);
        });
        it('reaches the create route', async () => {
            const res = await request.post('/users');
            expect(res.status).toBe(401);
        });
        it('reaches the authenticate route', async () => {
            const res = await request.post('/users/authenticate');
            expect(res.status).toBe(200);
        });
        it('reaches the DELETE route without any parameters', async () => {
            const res = await request.post('/users/authenticate');
            expect(res.status).toBe(200);
        });
        it('reaches the create POST route and retturns a 200 success', async () => {
            const res = await request.post('/users').send({
                firstname: testUser.firstname,
                lastname: testUser.lastname,
                username: testUser.username,
                password: testUser.password_digest,
                token: token
            });
            expect(res.status).toBe(200);
        });
        it('reaches the authenticate POST route and retturns a 200 success', async () => {
            const res = await request.post('/users/authenticate').send({
                firstname: testUser.firstname,
                lastname: testUser.lastname,
                username: testUser.username,
                password: testUser.password_digest,
                token: token
            });
            expect(res.status).toBe(200);
        });
        it('reaches the delete route and returns a 200 success', async () => {
            const res = await request.delete('/users').send({
                id: '10',
                token: token
            });
            expect(res.status).toBe(200);
        });
        it('reaches the show route and returns a 200 success', async () => {
            const res = await request.get('/users/:id').send({
                id: '10',
                token: token
            });
            expect(res.status).toBe(200);
        });
    });
});
