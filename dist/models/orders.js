"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=${1}';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`Could not get orders: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
