"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const store = new users_1.UserStore();
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
        const testUser = {
            firstname: 'Test',
            lastname: 'User',
            username: 'TestUser',
            password_digest: '354bner734bbbr732'
        };
        const result = await store.create(testUser);
        expect(result).toEqual({
            firstname: 'Test',
            lastname: 'User',
            username: 'TestUser',
            password_digest: '354bner734bbbr732'
        });
    });
    it('should list all users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('should show a user', async () => {
        const result = await store.show('2');
        expect(result.firstname).toEqual('Test');
    });
});
