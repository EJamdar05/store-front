## RESTful Routes

## Users
* app.get('users',index) will return every user in the table (and their associated columns) so long as the token is valid
* app.get('users/{:id}') will retrieve a specific user based off unique id
* app.post('users', create) will create a new user
* app.delete('/users, destroy) will delete a users account
* app.post('users/authenticate) will authenticate a user

## Product
* app.get('/products', index) will show every product
* app.get('/product/{:id}', show) will show a product based of their unique id
* app.post('/product', create) will create a new entry for a product

## Order
* app.get('/orders/{:id}', orders) will get an order based of it's unique id
* app.get('/orders', index) will list all orders
* app.post('/orders', create) will create a new order
* app.delete('/orders/{:id}', destroy) will delete an order
* app.post('/orders/currentOrder', current) will retrive all active orders for a specific user id

## Schemas
There are a total of 3 databases that are relational and relate back to each other

### Users
| id (SERIAL PRIMARY KEY) | firstname (VARCHAR) | lastname (VARCHAR) | username (VARCHAR) | password_digest (VARCHAR)   |
|----|-----------|----------|----------|--------------------|
| 1  | Test      | User     | TestUser | somehashedpassword |

The user table will contain a unique id, for every user, their first/last name, their username, and a salted hashed password to maintain 
data confidentiality.

### Products
| id (SERIAL PRIMARY KEY) | prod_name (VARCHAR) | price (integer) |
|----|-----------|-------|
| 1  | Laptop    | 200   |

Products will contain what products are available, as well as the price.

### Orders
| id (SERIAL PRIMARY KEY)| product_id (REFERENCES products(id)) | quantity (integer) | user_id (REFERENCES user(id)) | order_status (VARCHAR) |
|----|------------|----------|---------|--------------|
| 1  | 1          | 1        | 1       | ACTIVE       |

Orders is what brings these databases together. An order will have a unique id, a refference to the product that was bought, the quantrity of the product bought, a refference to the user who bought it and if the order is ACTIVE or COMPLETED.

