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
* app.get('/orders/{:id}', orders) will get an order based of it's unique id and will authenticate the user accessing the information
* app.get('/orders', index) will list all orders
* app.post('/orders', create) will create a new order
* app.delete('/orders/{:id}', destroy) will delete an order
* app.post('/orders/currentOrder', current) will retrive all active orders for a specific user id and authenticates the user accessing
* app.post('/orders/:id/products', addItem) will add order info regarding a user's order, such as what product they bought and how much off that quantity they want. User token is also authenticated.

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
| id (SERIAL PRIMARY KEY) | user_id (REFERENCES users(id)) | order_status (VARCHAR) |
|-------------------------|--------------------------------|------------------------|
| 1                       | 1                              | ACTIVE                 |

Orders will keep track of orders associated with particular user and if the order is completed. In order to get more information regarding the order, orders_prod table will fulfill that.

## Orders Product
| id (SERIAL PRIMARY KEY) | order_id (REFERENCES users(id)) | product_id (REFERENCES product(id) | quantity (integer) |
|-------------------------|---------------------------------|------------------------------------|--------------------|
| 1                       | 1                               | 1                                  | 1                  |

In this table, a person's ordered products can be queried. A order id refferences the customer id of who ordered the product, product id looks up a product in the product table and quantity ordered shows how much the user ordered. This seperate order table allows for quicker queries and allows for many to many relations. 

