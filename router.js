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

router.get("/:id/update",controllers.updateShoeGet)

//add
router.post("/addNewShoe", controllers.addShoeToShoesTable)
router.post("/addNewBrand", controllers.addNewBrand)
router.post("/addNewStyle", controllers.addNewStyle)

//modify
// router.get("/:id/updateShoe", controllers.updateShoeGet)
router.post("/:id/updateShoe", controllers.updateShoePost)


//search
router.get("/brandSearchResults", controllers.searchByBrand)
router.get("/styleSearchResults", controllers.searchByStyle)
module.exports = router;