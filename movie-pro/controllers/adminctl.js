module.exports.home = (req,res)=>{
    res.render("home")
}

module.exports.add = (req,res)=>{
    res.render("add")
}


const schema = require('../model/schema');

exports.home = async (req, res) => {
    try {
        let data = await schema.find({});
        console.log('Data:', data);
        res.render("home", { data }); 
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
};