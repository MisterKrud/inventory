const { Router } = require("express");
const router = Router();
const controllers = require("./controllers")


//temp
router.get("/", controllers.routerPlaceholder)
router.get("/new", (req, res) => {
    res.render("new")
})

router.get("/search", (req, res)=>{
    res.render("search")
})

//add
router.post("/addNewShoe", controllers.addShoeToShoesTable)
router.post("/addNewBrand", controllers.addNewBrand)
router.post("/addNewStyle", controllers.addNewStyle)


//search
router.get("/brandSearchResults", controllers.searchByBrand)
router.get("/styleSearchResults", controllers.searchByStyle)
module.exports = router;