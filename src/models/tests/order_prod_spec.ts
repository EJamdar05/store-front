import { OrderProd, orderProdStore } from '../order_prod';
import supertest from 'supertest';
import app from '../../server';
import { User } from '../users';
import jwt from 'jsonwebtoken'
const store = new orderProdStore();
const request = supertest(app)

const testUser: User = {
    firstname: 'Test',
    lastname: 'User',
    username: 'testuser',
    password_digest: 'letmein'
}

const token = jwt.sign(testUser, process.env.TOKEN_SECRET as string)


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
        const testProduct: OrderProd = {
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

describe('testing endpoints for order Products', ()=>{
    describe('be able to reach the endpoint and confirm it exists', ()=>{
        it('reaches the index route', async()=>{
            const res = await request.get('/orderprod')
            expect(res.status).toBe(200);
        })

        it('reaches the index route', async()=>{
            const res = await request.get('/orderprod/1')
            expect(res.status).toBe(200);
        })

        it('reaches the show route', async()=>{
            const res = await request.post('/orderprod')
            expect(res.status).toBe(200)
        })

        it('reaches the create POST route and returns a 200 success', async()=>{
            const res = await request.post('/orderprod').send({
                order_id: 1,
                product_id: 1,
                quantity: 2
            })
            expect(res.status).toBe(200);
        })

        it('reaches the create POST route and returns a 200 success', async()=>{
            const res = await request.get('/orderprod/1')
            expect(res.status).toBe(200);
            
        })
    })
})
