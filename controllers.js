const db = require("./db/queries")
const {body, validationResult, matchedData } = require("express-validator");


//Render all info on page
const routerPlaceholder = async (req, res) => {
    const shoes = await db.getShoesInformationTable();
    const styles = await db.getTypesTable();
    const brands = await db.getBrandsTable();
    console.log(shoes)
 
    res.render("index", {
        shoeTitle: "Shoes",
        shoes: shoes,
        styleTitle: "Styles",
        styles: styles,
        brandTitle: "Brands",
        brands: brands

    })
}


  
//Add new
const addShoeToShoesTable = async(req, res) => {
    const { brand, model, style, price} = req.body
    await db.addShoeToShoesTable(brand, model, style, price) 
    res.redirect("/")
}

const addNewBrand = async (req, res) => {
    const brandName = req.body.newBrand
    console.log(brandName)
    await db.addNewBrand(brandName)
    res.redirect("/")
}

const addNewStyle = async (req, res) => {
    const style = req.body.newStyle
    
    console.log(style)
    await db.addNewStyle(style)
    res.redirect("/")
}

//Search
const searchByBrand = async(req, res)=> {
    const brandFilter = req.query.brandFilter
    console.log(req.query)
   const brand =  await db.searchByBrand(brandFilter)
    res.render("searchResults", {
        brandTitle: "Brand Search Results",
        brand: brand,
        style: null
    })
}

const searchByStyle = async (req, res) => {
    const styleFilter = req.query.styleFilter
    const style = await db.searchByStyle(styleFilter)
    console.log(style)
    res.render("searchResults", {
        styleTitle: "Style search results",
        style: style,
        brand: null
    })
}

//Update
const updateShoeGet = async(req, res) => {
    const shoeId = Number(req.params.id)
    console.log(shoeId)
    const shoe = await db.getShoeToUpdate(shoeId)
    console.log(shoe)
    res.render("update", {
        shoe: shoe
    })
}

const updateShoePost = async (req, res) => {
    const shoe = req.body
    console.log(shoe)
    console.log(shoe.id)
    await db.updateShoe(shoe.updateBrand, shoe.updateModel, shoe.updateType, shoe.updatePrice, shoe.updateId)
    res.redirect("/")
}

//Delete

const deleteShoe = async (req, res) => {
    const shoeId = req.params.id
    console.log(shoeId, typeof(shoeId))
    await db.deleteShoe(shoeId)
    res.redirect("/");
}

const deleteBrand = async(req, res) =>{
    await db.deleteBrand(req.params.id)
    res.redirect("/");
}

const deleteStyle = async(req, res) => {
    await db.deleteStyle(req.params.id)
    res.redirect("/");
}

module.exports = {
    routerPlaceholder,
    addShoeToShoesTable,
    addNewBrand,
    addNewStyle,
    searchByBrand,
    searchByStyle,
    updateShoeGet,
    updateShoePost, 
    deleteShoe,
    deleteBrand,
    deleteStyle
};