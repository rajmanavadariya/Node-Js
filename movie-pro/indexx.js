const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const schema = require("./model/schema"); // Make sure schema is required
const db = require("./config/db");

const app = express();
const port = 4001;


// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "images")));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", require("./routes"));

// Multer storage setup
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Add file extension
        cb(null, file.fieldname + "-" + Date.now() + ext);
    }
});

const uploadpic = multer({
    storage: Storage
}).single("image");

// Home route to display data
app.get("/", async (req, res) => {
    let data = await schema.find({});
    data ? res.redirect("/") : console.log("Data not found");
});

// Insert data with image upload
app.post("/insert", uploadpic, async (req, res) => {
    req.body.image = req.file.path;
    let data = await schema.create(req.body);
    data ? res.redirect("/") : console.log("Data not submitted");
});

// Delete data
app.get("/deleteData", async (req, res) => {
    let singledata = await schema.findById(req.query.id);
    fs.unlinkSync(singledata.image); // Delete image from file system
    let deletedata = await schema.findByIdAndDelete(req.query.id);
    deletedata ? res.redirect("back") : console.log("Data not deleted");
});

// Edit data
app.get("/editData", async (req, res) => {
    let editschema = await schema.findById(req.query.id);
    editschema ? res.render("edit", { editschema }) : console.log("Data not found");
});

// Update data with image handling
app.post("/updateData", uploadpic, async (req, res) => {
    let img = "";
    let singledata = await schema.findById(req.query.id);
    req.file ? img = req.file.path : img = singledata.image;

    if (req.file) {
        fs.unlinkSync(singledata.image); // Remove old image if a new one is uploaded
    }

    req.body.image = img;
    let updatedata = await schema.findByIdAndUpdate(req.query.id, req.body);
    updatedata ? res.redirect("/") : console.log("Data not updated");
});

// Start the server
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server started on port ${port}`);
});
