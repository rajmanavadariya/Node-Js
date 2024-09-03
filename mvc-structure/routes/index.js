const express = require("express");
const routes = express.Router();

const adminctl = require("../controllers/adminctl")

routes.get("/",adminctl.home)
routes.get("/about",adminctl.about)
routes.get("/contact",adminctl.contact)

module.exports = routes;