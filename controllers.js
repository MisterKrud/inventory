const db = require("./db/queries")
const {body, validationResult, matchedData } = require("express-validator");


//Render all info on page

const homepage = async (req, res) => {
    const shoes = await db.getShoesInformationTable();
    res.render("index", {
       title: "Shoes",
        shoes: shoes,
    })

}


const routerPlaceholder = async (req, res) => {
    const shoes = await db.getShoesInformationTable();
    const styles = await db.getTypesTable();
    const brands = await db.getBrandsTable();
    console.log(shoes)
 
    res.render("admin", {
        shoeTitle: "Shoes",
        shoes: shoes,
        styleTitle: "Styles",
        styles: styles,
        brandTitle: "Brands",
        brands: brands

    })
}

//validators
const newShoeValidator = [
    body("brand").trim()
   
    .isLength({min: 1, max: 20}).withMessage('Brand names can be no longer than 20 charcters'),
    body("model").trim()
    .isLength({min: 1, max: 30}).withMessage('Shoe model names must be 30 characters or fewer'),
    body("s")
]

const brandNameValidator = [
    body("newBrand").trim()
    .isLength({min: 1, max: 20}).withMessage('Brand names can be no longer than 20 charcters')
]

const styleNameValidator = [
    body("newStyle").trim()
    .isLength({min: 1, max: 20}).withMessage('Style names must be 20 characters or under')
]
  
//Add new
const addShoeToShoesTable = [ 
    newShoeValidator, async(req, res) => {
    const errors = validationResult(req);
    console.log(validationResult(req))
    if(!errors.isEmpty()){
      return res.status(400).render("admin", {
        title: "New Message",
        errors: errors.array(),
      })
    }    
    const { brand, model, style, price} = matchedData(req)
    await db.addShoeToShoesTable(brand, model, style, price) 
    res.redirect("admin")
}
]
const addNewBrand = [
    brandNameValidator, async (req, res) => {
    const errors = validationResult(req);
    console.log(validationResult(req))
    if(!errors.isEmpty()){
      return res.status(400).render("partials/errors", {
        title: "New Message",
        errors: errors.array(),
      })
    }    
    const data = matchedData(req)
    const brandName = data.newBrand
    await db.addNewBrand(brandName)
    res.redirect("admin")
}
]

const addNewStyle = [
    styleNameValidator, async (req, res) => {
    const errors = validationResult(req);
    console.log(validationResult(req))
    if(!errors.isEmpty()){
      return res.status(400).render("newStyle", {
        title: "New Message",
        errors: errors.array(),
      })
    }    
    const data = matchedData(req)
    const style = data.newStyle
    await db.addNewStyle(style)
    res.redirect("admin")
}
]

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
    res.redirect("admin")
}

//Delete

const deleteShoe = async (req, res) => {
    const shoeId = req.params.id
    console.log(shoeId, typeof(shoeId))
    await db.deleteShoe(shoeId)
    res.redirect("admin");
}

const deleteBrand = async(req, res) =>{
    await db.deleteBrand(req.params.id)
    await db.deleteAllShoesInBrand(req.params.id)
    res.redirect("admin");
}

const deleteStyle = async(req, res) => {
    await db.deleteStyle(req.params.id)
    res.redirect("admin");
}

module.exports = {
    routerPlaceholder,
    homepage,
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