const { Router } = require("express");
const router = Router();
const controllers = require("./controllers")


//temp
router.get("/", controllers.routerPlaceholder)

module.exports = router;