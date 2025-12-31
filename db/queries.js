const pool = require("./pool");

async function getBrandsTable() {
    const { rows } = await pool.query("SELECT * from brands")
    return rows;
}

async function getShoesTable() {
    const { rows } = await pool.query("SELECT * from shoes")
    return rows;
}

async function getTypesTable() {
    const { rows } = await pool.query("SELECT * from shoe_types")
    return rows;
}

async function getShoeVariantsTable() {
    const { rows } = await pool.query("SELECT * from shoe_variants")
    return rows;
}

async function addShoeToShoesTable( brand, model, style, price) {
   await pool.query("INSERT INTO shoes (brand_id, model, type_id, price) VALUES((SELECT id from BRANDS where name = $1),$2,(SELECT id FROM shoe_types WHERE style = $3),$4)", [brand, model, style, price])
}

async function addNewBrand(brandName){
    await pool.query("INSERT INTO brands (name) VALUES($1)", [brandName])
}

async function addNewStyle(styleName){
    await pool.query("INSERT INTO shoe_types (style) VALUES($1)", [styleName])
}



module.exports = {
    getBrandsTable,
    getShoeVariantsTable,
    getShoesTable,
    getTypesTable,
    getShoeVariantsTable,
    addShoeToShoesTable,
    addNewBrand, 
    addNewStyle
}