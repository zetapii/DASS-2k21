const mongoose = require("mongoose")

const pendingSchema = new mongoose.Schema({
    sender : 
    {
        type:String,
    },
    receiver:
    {
        type:String,
    },
    gasfees:
    {
        type:String
    },
    amount:
    {
        type:String
    },
    resolved:
    {
        type:Boolean
    }
})

module.exports = mongoose.model('pending',pendingSchema);