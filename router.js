const { Router } = require("express");
const router = Router();
const controllers = require("./controllers")


//temp
router.get("/", controllers.routerPlaceholder)
router.get("/new", (req, res) => {
    res.render("new")
})
router.post("/addNewShoe", controllers.addShoeToShoesTable)
router.post("/addNewBrand", controllers.addNewBrand)
router.post("/addNewStyle", controllers.addNewStyle)

module.exports = router;