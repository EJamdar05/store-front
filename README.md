# Storefront Backend Project

## About
This is a functional backend for an e-commerce website. Written in TypeScript, this backend communicates with a PSQL server to keep track of user accounts, their active orders and current stock available on the site. In addition, it also authenticates user actions, hashes password and validates tokens.

## Installation
To get the development enviorment up and running, run the following commands
```
npm install
yarn
```
Make sure that you have both Node and Yarn installed on your system. 

To run the server, simply run
```
yarn watch
```
This will run on port 3000. To access on a browser, simply input localhost:3000 to confirm the server is running.

## Setup
Make sure to have PostgreSQL installed on your computer and create the following databases
* storefront_dev 
* storefront_test 
```
(CREATE DATABASE storefront_dev)
(CREATE DATABASE storefront_test)
```

Make sure to grant all privleges to the user for both test and dev 
```
GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO someuser
```

In order to create the tables, use db-migrate up to automatically add the tables without having to do so manually.

NOTE: The port for Postgre is the default 5432