CREATE DATABASE Bamazon;

use Bamazon;

CREATE TABLE products (
	id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
    price INTEGER, 
    stock_quantity INTEGER, 
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Kobe Bryant #8 Jersey", "Sports Apparel",   100, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Kobe Bryant #24 Jersey", "Sports Apparel",   150, 1500);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Michael Jordan #23 Jersey", "Sports Apparel",  200, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Michael Jordan #45 Jersey", "Sports Apparel",   250, 2500);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Playstation 4", "Electronics",   300, 3000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Xbox1", "Electronics",   350, 3500);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Kikanga TShirt", "Casual Wear",   15, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Tuxedo", "Formal Wear",   3000, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Toilet Paper", "Essentials",   10, 1025);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Vodka", "Beverages",   25, 205);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Gum", "Snacks",   1, 5000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES("Laundry Detergent", "Laundry Care",   13, 1000);

SELECT * FROM  products;

SELECT * FROM products WHERE id = 3

UPDATE products SET product_name = "Paper" WHERE products.id = 13
-- This is changing the id from item_id to id. 
ALTER TABLE products CHANGE id id  INTEGER AUTO_INCREMENT NOT NULL;
-- When you change the item_id column you need to change the primary id as well
ALTER TABLE products DROP PRIMARY KEY, ADD PRIMARY KEY(id);

SELECT * FROM products WHERE products.stock_quantity < 6

DELETE FROM products WHERE products.id = 1

UPDATE products SET products.stock_quantity = 4  WHERE products.id = 13
