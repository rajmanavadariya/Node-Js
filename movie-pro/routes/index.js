const express = require("express");
const routes = express.Router();

const adminctl = require("../controllers/adminctl")

routes.get("/",adminctl.home);
routes.get("/add",adminctl.add);



module.exports = routes;