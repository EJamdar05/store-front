import Client from '../database';

export type Order = {
    id?: string;
    user_id: number;
    order_status: string;
};

export type OrderProd = {
    id?: string;
    order_id: number;
    product_id: number;
    quantity: number;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Error! Cannot get orders: ${err}`);
        }
    }
    async show(id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get orders: ${err}`);
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';
            const conn = await Client.connect();
            await conn.query(sql, [order.user_id, order.order_status]);
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Order ${order.id} could not be created: ${err}`);
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id = ($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result;
        } catch (err) {
            throw new Error(`Could not delete order ${id}: ${err}`);
        }
    }

    async currentOrder(uid: string): Promise<Order[]> {
        try {
            const sql =
                "SELECT * FROM orders WHERE user_id=($1) AND order_status='ACTIVE'";
            const conn = await Client.connect();
            const result = await conn.query(sql, [uid]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not retrive order(s) for user id#${uid}: ${err}`,
            );
        }
    }

    async createProduct(pOrder: OrderProd): Promise<Order> {
        try {
            const sql =
                'INSERT INTO order_prod (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const conn = await Client.connect();
            const result = await Client.query(sql, [
                pOrder.order_id,
                pOrder.product_id,
                pOrder.quantity,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Cannot add product to order ${pOrder.order_id}: ${err}`,
            );
        }
    }
}
