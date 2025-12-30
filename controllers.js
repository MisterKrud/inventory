const db = require("../db.queries")
const {body, validationResult, matchedData } = require("express-validator");


//temp
const routerPlaceholder = (req, res) => {
    res.render("index", {
        title: "Placeholder"
    })
}


//temp
module.exports = {routerPlaceholder};