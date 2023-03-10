import { Product, ProductStore } from '../products';
import supertest from 'supertest';
import app from '../../server';
import { User } from '../users';
import jwt from 'jsonwebtoken'
const store = new ProductStore();
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

    it('create method should create a product', async () => {
        const testProduct: Product = {
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

describe('testing endpoints for products', ()=>{
    describe('be able to reach the endpoint and confirm it exists', ()=>{
        it('reaches the index route', async()=>{
            const res = await request.get('/products')
            expect(res.status).toBe(200);
        })

        it('reaches the index route', async()=>{
            const res = await request.get('/products')
            expect(res.status).toBe(200);
        })

        it('reaches the show route', async()=>{
            const res = await request.get('/product/1')
            expect(res.status).toBe(200)
        })
        it('reaches the create POST route without any parameters', async()=>{
            const res = await request.post('/product')
            expect(res.status).toBe(400);
        })

        it('reaches the create POST route and retturns a 200 success', async()=>{
            const res = await request.post('/product').send({
                name: 'Screwdriver',
                price: 200,
                token: token
            })
            expect(res.status).toBe(200);
        })
    })
})
