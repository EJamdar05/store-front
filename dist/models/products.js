"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot retrieve products: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot retrieve product ${id}: ${err}`);
        }
    }
    async create(product) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (prod_name, price) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [product.prod_name, product.price]);
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Cannot create product ${product.prod_name}: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
