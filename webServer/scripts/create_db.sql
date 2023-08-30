CREATE DATABASE billing_records;

DROP TABLE IF EXISTS usage_records;

DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    "id" int PRIMARY KEY,
    "name" varchar(25) not null
);

CREATE TABLE usage_records (
    "customerid" int NOT NULL,
    "service" varchar(25) NOT NULL,
    "unitsconsumed" int NOT NULL,
    "priceperunit" float(4) NOT NULL,
    CONSTRAINT usage_records_pk PRIMARY KEY ("customerid", "service"),
    CONSTRAINT usage_records_customers_id_fk FOREIGN KEY ("customerid") REFERENCES customers(id)
);

-- Prepopulating the customer table with a few values, as we will never directly interact with it.
INSERT INTO
    customers
VALUES
    (1, 'mateo'),
    (2, 'Jado'),
    (3, 'Mark')