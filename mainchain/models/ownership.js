const mongoose = require("mongoose")

const ownershipSchema = new mongoose.Schema({
    Node : 
    {
        type:String,
    },
    Accounts:
    {
        
    }
})

module.exports = mongoose.model('ownership',ownershipSchema);
