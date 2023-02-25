"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_prod_1 = require("../order_prod");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new order_prod_1.orderProdStore();
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
    it('should have a delete method', () => {
        expect(store.index).toBeDefined();
    });
    it('create method should create a product order', async () => {
        const testProduct = {
            order_id: 1,
            product_id: 1,
            quantity: 2
        };
        const result = await store.create(testProduct);
        expect(result.id).toBeGreaterThan(0);
    });
    it('should list all orders for products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('should show a products order', async () => {
        const result = await store.show('1');
        expect(result.id).toBeGreaterThan(0);
    });
});
describe('testing endpoints for order Products', () => {
    describe('be able to reach the endpoint and confirm it exists', () => {
        it('reaches the index route', async () => {
            const res = await request.get('/orderprod');
            expect(res.status).toBe(200);
        });
        it('reaches the index route', async () => {
            const res = await request.get('/orderprod/1');
            expect(res.status).toBe(200);
        });
        it('reaches the show route', async () => {
            const res = await request.post('/orderprod');
            expect(res.status).toBe(200);
        });
        it('reaches the create POST route and returns a 200 success', async () => {
            const res = await request.post('/orderprod').send({
                order_id: 1,
                product_id: 1,
                quantity: 2
            });
            expect(res.status).toBe(200);
        });
        it('reaches the create POST route and returns a 200 success', async () => {
            const res = await request.get('/orderprod/1');
            expect(res.status).toBe(200);
        });
    });
});
