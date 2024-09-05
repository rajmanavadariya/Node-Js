app.get("/", async (req, res) => {
    let data = await schema.find({});
    data ? res.render("indexx", { data }) : console.log("Data not found");
});

// Insert data with image upload

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