const db = require("./db/queries")
const {body, validationResult, matchedData } = require("express-validator");


//temp
const routerPlaceholder = async (req, res) => {
    const shoes = await db.getShoesTable();
    const styles = await db.getTypesTable();
    const brands = await db.getBrandsTable();
 
    res.render("index", {
        shoeTitle: "Shoes",
        shoes: shoes,
        styleTitle: "Styles",
        styles: styles,
        brandTitle: "Brands",
        brands: brands

    })
}
  

const addShoeToShoesTable = async(req, res) => {
    const { brand, model, style, price} = req.body
    await db.addShoeToShoesTable(brand, model, style, price) 
    res.redirect("/")
}

const addNewBrand = async (req, res) => {
    const {brandName} = req.body
    await db.addNewBrand(brandName)
    res.redirect("/")
}

const addNewStyle = async (req, res) => {
    const {style} = req.body
    await db.addNewStyle(style)
    res.redirect("/")
}

const searchByBrand = async(req, res)=> {
    const brandFilter = req.query.brandFilter
    console.log(req.query)
   const brand =  await db.searchByBrand(brandFilter)
    res.render("brandSearchResults", {
        brandTitle: "Brand Search Results",
        brand: brand
    })
}

const searchByStyle = async (req, res) => {
    const styleFilter = req.query.styleFilter
    const style = await db.searchByStyle(styleFilter)
    console.log(style)
    res.render("styleSearchResults", {
        styleTitle: "Style search results",
        style: style
    })
}

//temp
module.exports = {
    routerPlaceholder,
    addShoeToShoesTable,
    addNewBrand,
    addNewStyle,
    searchByBrand,
    searchByStyle
};