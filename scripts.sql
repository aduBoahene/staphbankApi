
CREATE TABLE customer (
	customer_id serial PRIMARY KEY,
	firstname VARCHAR ( 50 ) NOT NULL,
	lastname VARCHAR ( 50 ) NOT NULL,
	password VARCHAR ( 250 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	phone_number VARCHAR ( 50 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP 
);

CREATE TABLE account (
  account_id serial PRIMARY KEY,
	account_number VARCHAR ( 50 ) NOT NULL,
	balance int NOT NULL,
	customer_id int NOT NULL
);

CREATE TABLE transactions (
	transactions_id serial PRIMARY KEY,
	account_id int NOT NULL,
  	account_action VARCHAR NOT NULL
);

--foreign keys
ALTER TABLE account 
ADD CONSTRAINT fk_account_customer_id 
FOREIGN KEY (customer_id) REFERENCES customer(customer_id);


ALTER TABLE transactions 
ADD CONSTRAINT fk_transactions_account_id 
FOREIGN KEY (account_id) REFERENCES account(account_id);


CREATE TABLE roles (
	roles_id serial PRIMARY KEY,
	rolename VARCHAR ( 20 ) UNIQUE NOT NULL
);

ALTER TABLE customer
ADD roles_id int;

ALTER TABLE customer 
ADD CONSTRAINT fk_customer_roles 
FOREIGN KEY (roles_id) REFERENCES roles(roles_id);


ALTER TABLE transactions
ADD from_account int;

ALTER TABLE transactions
ADD transaction_status int;

ALTER TABLE transactions
ADD to_account int;


ALTER TABLE transactions
ADD reciepient_phone character varying;

ALTER TABLE transactions
ADD routing_number character varying;


ALTER TABLE transactions
ADD amount character int;

ALTER TABLE transactions
ADD routing_number character varying;

ALTER TABLE transactions
ADD transaction_date timestamp without time zone;


ALTER TABLE transactions
ADD phone_number character varying;


ALTER TABLE transactions
ADD bankName character varying;

ALTER TABLE transactions
ADD customer_id int;



ALTER TABLE tbl_name ALTER COLUMN col_name TYPE varchar (11);

ALTER TABLE transactions ALTER COLUMN from_account TYPE varchar (50);
ALTER TABLE transactions ALTER COLUMN to_account TYPE varchar (50);













