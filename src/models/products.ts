import Client from '../database';

export type Product = {
    id?: string;
    prod_name: string;
    price: number;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot retrieve products: ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot retrieve product ${id}: ${err}`);
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO products (prod_name, price) VALUES($1, $2) RETURNING *';
            await conn.query(sql, [
                product.prod_name,
                product.price,
            ]);
            conn.release();
            return product;
        } catch (err) {
            throw new Error(
                `Cannot create product ${product.prod_name}: ${err}`,
            );
        }
    }
}
