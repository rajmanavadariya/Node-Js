const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        subject : {
            type : String,
            required : true   
        },
        image :{
            type : String,
            required :true

        }
    }
);

const crudtable = mongoose.model("Schema",schema)

module.exports = crudtable