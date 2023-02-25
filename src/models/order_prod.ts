import Client from '../database';

export type OrderProd = {
    id?: string;
    order_id: number;
    product_id: number;
    quantity: number;
};

export class orderProdStore {
    async index(): Promise<OrderProd[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM order_prod';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot retrieve order details: ${err}`);
        }
    }

    async show(id: string): Promise<OrderProd> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM order_prod WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot retrieve order ${id}: ${err}`);
        }
    }

    async create(product: OrderProd): Promise<OrderProd> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO order_prod (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            await conn.query(sql, [
                product.order_id,
                product.product_id,
                product.quantity,
            ]);
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`Cannot create order ${product.order_id}: ${err}`);
        }
    }
}
