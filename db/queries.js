const pool = require("./pool");

//View enitre tables

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

async function getShoesInformationTable() {
    const {rows } = await pool.query(
        "SELECT shoes.id, brands.name, shoes.model, shoe_types.style, shoes.price FROM shoes JOIN brands ON (brands.id = shoes.brand_id) JOIN shoe_types on (shoe_types.id = shoes.type_id)"
    )
    return rows;
}

async function getShoeVariantsTable() {
    const { rows } = await pool.query("SELECT * from shoe_variants")
    return rows;
}

//Add entires

async function addShoeToShoesTable( brand, model, style, price) {
   await pool.query("INSERT INTO shoes (brand_id, model, type_id, price) VALUES((SELECT id from BRANDS where name = $1),$2,(SELECT id FROM shoe_types WHERE style = $3),$4)", [brand, model, style, price])
}

async function addNewBrand(brandName){
    await pool.query("INSERT INTO brands (name) VALUES($1)", [brandName])
}

async function addNewStyle(styleName){
    await pool.query("INSERT INTO shoe_types (style) VALUES($1)", [styleName])
}

//Update
async function getShoeToUpdate(id){
    const {rows} = await pool.query("SELECT shoes.id, brands.name as brand, shoes.model, shoe_types.style, shoes.price FROM shoes JOIN shoe_types ON (shoes.type_id = shoe_types.id) JOIN brands ON (shoes.brand_id = brands.id) WHERE shoes.id = $1", [id])
    console.log('The get query is executing')
    console.log(`shoe is:`)
   
    return rows[0]
}

async function updateShoe(brand_id, model, type_id, price, id){
    await pool.query("UPDATE shoes SET brand_id = brands.id, model = $2, type_id = shoe_types.id, price = $4 FROM brands, shoe_types WHERE shoes.id = $5 AND brands.name = $1 AND shoe_types.style = $3;", [brand_id, model, type_id, price, id])
}

//Search

async function searchByBrand(brand) {
  const { rows } =  await pool.query("SELECT brands.name as brand, shoes.model, shoes.price  FROM shoes JOIN brands ON (shoes.brand_id = brands.id) WHERE brands.name = $1", [brand])
  return rows;
}

async function searchByStyle(style) {
    const { rows } = await pool.query("SELECT shoe_types.style, shoes.model, shoes.price  FROM shoes JOIN shoe_types ON (shoes.type_id = shoe_types.id) WHERE shoe_types.style = $1", [style])
    return rows;
}

//Delete

async function deleteShoe(id){
   await pool.query("DELETE from shoes WHERE shoes.id = $1", [id]) 
}

async function deleteBrand(id){
    await pool.query("DELETE FROM brands WHERE brands.id = $1", [id])
}

async function deleteStyle(id){
    await pool.query("DELETE FROM shoe_types WHERE shoe_types.id = $1", [id])
}


module.exports = {
    getShoesInformationTable,
    getBrandsTable,
    getShoeVariantsTable,
    getShoesTable,
    getTypesTable,
    getShoeVariantsTable,
    addShoeToShoesTable,
    addNewBrand, 
    addNewStyle,
    searchByBrand,
    searchByStyle,
    getShoeToUpdate,
    updateShoe,
    deleteShoe,
    deleteBrand,
    deleteStyle
}

