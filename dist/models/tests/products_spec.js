"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new products_1.ProductStore();
const request = (0, supertest_1.default)(server_1.default);
const testUser = {
    firstname: 'Test',
    lastname: 'User',
    username: 'testuser',
    password_digest: 'letmein'
};
const token = jsonwebtoken_1.default.sign(testUser, process.env.TOKEN_SECRET);
describe('Product model tests', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('create method should create a product', async () => {
        const testProduct = {
            prod_name: 'Laptop',
            price: 200,
        };
        const result = await store.create(testProduct);
        expect(result.prod_name).toEqual('Laptop');
    });
    it('should list all products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('should show a product', async () => {
        const result = await store.show('1');
        expect(result.prod_name).toEqual('Sneed');
    });
});
describe('testing endpoints for products', () => {
    describe('be able to reach the endpoint and confirm it exists', () => {
        it('reaches the index route', async () => {
            const res = await request.get('/products');
            expect(res.status).toBe(200);
        });
        it('reaches the index route', async () => {
            const res = await request.get('/products');
            expect(res.status).toBe(200);
        });
        it('reaches the show route', async () => {
            const res = await request.get('/product/1');
            expect(res.status).toBe(200);
        });
        it('reaches the create POST route without any parameters', async () => {
            const res = await request.post('/product');
            expect(res.status).toBe(400);
        });
        it('reaches the create POST route and retturns a 200 success', async () => {
            const res = await request.post('/product').send({
                name: 'Screwdriver',
                price: 200,
                token: token
            });
            expect(res.status).toBe(200);
        });
    });
});
