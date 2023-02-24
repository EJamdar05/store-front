"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error! Cannot get users: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot retrive user ${id}: ${err}`);
        }
    }
    async create(user) {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(user.password_digest + pepper, Number(saltRounds));
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [user.firstname, user.lastname, user.username, hash]);
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`User ${user.username} could not be created: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id = ($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}: ${err}`);
        }
    }
    async authentication(username, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT password_digest FROM users WHERE username = ($1)';
            const result = await conn.query(sql, [username]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            throw new Error(`Could not authenticate ${username}: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
