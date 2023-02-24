import Client from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
    id?: string;
    firstname?: string | null;
    lastname?: string | null;
    username: string;
    password_digest: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Error! Cannot get users: ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot retrive user ${id}: ${err}`);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt.hashSync(
                user.password_digest + pepper,
                Number(saltRounds),
            );
            const conn = await Client.connect();
            await conn.query(sql, [
                user.firstname,
                user.lastname,
                user.username,
                hash,
            ]);
            conn.release();
            return user;
        } catch (err) {
            throw new Error(
                `User ${user.username} could not be created: ${err}`,
            );
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id = ($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result;
        } catch (err) {
            throw new Error(`Could not delete user ${id}: ${err}`);
        }
    }

    async authentication(
        username: string,
        password: string,
    ): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT password_digest FROM users WHERE username = ($1)';
            const result = await conn.query(sql, [username]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                if (
                    bcrypt.compareSync(password + pepper, user.password_digest)
                ) {
                    return user;
                }
            }
            return null;
        } catch (err) {
            throw new Error(`Could not authenticate ${username}: ${err}`);
        }
    }
}
