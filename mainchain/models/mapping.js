const mongoose = require("mongoose")

const mappingSchema = new mongoose.Schema({
    username : 
    {
        type:String,
    },
    accountIdMainchain:
    {
        type:String,
    },
    accountIdSidechain:
    {
        type:String
    },
    balance:
    {
        type:String
    },
    password:
    {
        type:String
    },
    funded:
    {
        type:Boolean
    }
})

module.exports = mongoose.model('mapping',mappingSchema);