"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const store = new products_1.ProductStore();
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
    it('create method should create a product', async () => {
        const testProduct = {
            prod_name: 'Laptop',
            price: 200
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
        expect(result.prod_name).toEqual('Laptop');
    });
});