const express = require("express")

const port = 2552;

const app =express();
const db = require("./config/database");
const crudschema = require("./model/crudschema");
app.set("view engine","ejs");
app.use("/",require("./routes"));

app.listen(port,console.log(`Server Started ${port}`));
