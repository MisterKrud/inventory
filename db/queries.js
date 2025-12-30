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

module.exports = {
    getBrandsTable,
    getShoeVariantsTable,
    getShoesTable,
    getShoeVariantsTable
}