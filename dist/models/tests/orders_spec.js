"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const store = new orders_1.OrderStore();
describe('User model tests', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('should have a currentOrder method', () => {
        expect(store.currentOrder).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('create method should create a product', async () => {
        const testProduct = {
            product_id: 1,
            quantity: 2,
            user_id: 3,
            order_status: 'ACTIVE'
        };
        const result = await store.create(testProduct);
        expect(result.order_status).toEqual('ACTIVE');
    });
    it('should list current orders for user#3', async () => {
        const result = await store.currentOrder('3');
        expect(result.length).toBeGreaterThan(0);
    });
    // it('should show a product', async()=>{
    //     const result = await store.show('1');
    //     expect(result.prod_name).toEqual('Laptop');
    // })
});
