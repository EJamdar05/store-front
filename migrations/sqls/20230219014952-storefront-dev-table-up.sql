/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    prod_name VARCHAR,
    price integer NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    username VARCHAR,
    password_digest VARCHAR
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity integer,
    user_id bigint REFERENCES users(id),
    order_status VARCHAR
);
