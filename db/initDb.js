require("dotenv").config()
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS shoes(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand_id INTEGER, model TEXT, type_id INTEGER, price 
  NUMERIC(5, 2)
);

CREATE TABLE IF NOT EXISTS brands(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name TEXT
);

CREATE TABLE IF NOT EXISTS shoe_types(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, style TEXT
);

CREATE TABLE IF NOT EXISTS shoe_variants(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, shoe_id INTEGER, colour TEXT, gender TEXT, size NUMERIC(2, 1)
);


INSERT INTO brands (name)
VALUES('Nike'),('Reebok'),('Adidas'),('New Balance'), ('Converse');

INSERT INTO shoe_types (style)
VALUES('Formal'), ('Casual'), ('Sneaker'), ('Boots'), ('Sandals & Thongs');

INSERT INTO shoes(brand_id, model, type_id, price)
VALUES (1, 'Nike Alphafly 3', 3, 390.00), (5, 'Chuck Taylor All Star', 2, 80.00)
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DEV_DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();