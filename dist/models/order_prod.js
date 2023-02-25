"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProdStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderProdStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM order_prod';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot retrieve order details: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM order_prod WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot retrieve order ${id}: ${err}`);
        }
    }
    async create(product) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_prod (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            await conn.query(sql, [
                product.order_id,
                product.product_id,
                product.quantity,
            ]);
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Cannot create order ${product.order_id}: ${err}`);
        }
    }
}
exports.orderProdStore = orderProdStore;
