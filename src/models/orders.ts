import Client from "../database";

export type Order = {
    id?: string;
    product_id: Number;
    quantity: Number;
    user_id: Number;
    order_status: String;
}

export class OrderStore{
    async show(id: string): Promise<Order[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=${1}';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result; 
        }catch(err){
            throw new Error(`Could not get orders: ${err}`);
        }
    }
}