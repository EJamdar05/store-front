"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error! Cannot get orders: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get orders: ${err}`);
        }
    }
    async create(order) {
        try {
            const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            await conn.query(sql, [order.user_id, order.order_status]);
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Order ${order.id} could not be created: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id = ($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}: ${err}`);
        }
    }
    async currentOrder(uid) {
        try {
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND order_status='ACTIVE'";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [uid]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not retrive order(s) for user id#${uid}: ${err}`);
        }
    }
    async createProduct(pOrder) {
        try {
            const sql = 'INSERT INTO order_prod (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await database_1.default.query(sql, [
                pOrder.order_id,
                pOrder.product_id,
                pOrder.quantity,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot add product to order ${pOrder.order_id}: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
