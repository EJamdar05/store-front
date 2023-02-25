import { Order, OrderStore, OrderProd } from '../orders';
import supertest from 'supertest';
import app from '../../server'
import jwt from 'jsonwebtoken'
import { User } from '../users';
const store = new OrderStore();
const request = supertest(app)


const testUser: User = {
    firstname: 'Test',
    lastname: 'User',
    username: 'testuser',
    password_digest: 'letmein'
}

const token = jwt.sign(testUser, process.env.TOKEN_SECRET as string)


describe('order model tests', () => {
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
        const testProduct: Order = {
            user_id: 3,
            order_status: 'ACTIVE',
        };
        const result = await store.create(testProduct);
        expect(result.order_status).toEqual('ACTIVE');
    });

    it('should list current orders for user', async () => {
        const result = await store.currentOrder('10');
        expect(result.length).toBeGreaterThan(0);
    });

    it('should show orders for a user', async () => {
        const result = await store.show('10');
        expect(result.id).toBeGreaterThan(0);
    });

    it('should create a product', async ()=>{
        const prod: OrderProd = {
            order_id: 1,
            product_id: 1,
            quantity: 2
        }
        const result = await store.createProduct(prod);
        expect(result.id).toBeGreaterThan(1);
    })

    it('should delete an item', async ()=>{
        const result = await store.delete('1')
        expect(result.id).toBeGreaterThan(0)
    })

});

describe('testing endpoints for orders', ()=>{
    describe('be able to reach the endpoint and confirm it exists', ()=>{
        it('reaches the index route', async()=>{
            const res = await request.get('/orders')
            expect(res.status).toBe(200);
        })

        it('reaches the show route', async()=>{
            const res = await request.get('/orders/1')
            expect(res.status).toBe(200);
        })

        it('reaches the create route', async()=>{
            const res = await request.post('/orders')
            expect(res.status).toBe(400)
        })
        it('reaches the delete route', async()=>{
            const res = await request.delete('/orders/1')
            expect(res.status).toBe(200);
        })
        it('reaches the currentOrder route', async()=>{
            const res = await request.post('/orders/currentOrder')
            expect(res.status).toBe(200);
        })
        it('reaches the add item route', async()=>{
            const res = await request.post('/orders/1/products')
            expect(res.status).toBe(200);
        })

        it('reaches the create route and returns a 200 success', async()=>{
            const res = await request.post('/orders').send({
                uid: 10,
                ostat: 'ACTIVE',
                token: token
            })
            expect(res.status).toBe(200);
        })

        it('reaches the show route and returns a 200 success', async()=>{
            const res = await request.get('/orders/3').send({
                id: '3',
                token: token
            })
            expect(res.status).toBe(200);
        })

        it('reaches the delete route and returns a 200 success', async()=>{
            const res = await request.delete('/orders/3').send({
                id: '3',
                token: token
            })
            expect(res.status).toBe(200);
        })

        it('reaches the post route for currentOrder and posts 200', async()=>{
            const res = await request.post('/orders/currentOrder').send({
                id: '3',
                token: token
            })
            expect(res.status).toBe(200);
        })

        it('reaches the post route for addItem and posts 200', async()=>{
            const res = await request.post('/orders/10/products').send({
                oid: '3',
                pid: '1',
                token: token
            })
            expect(res.status).toBe(200);
        })
    })
});