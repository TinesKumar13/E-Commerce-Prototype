const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema;





const OrderSchema = mongoose.Schema({
    products : [{}],
    transaction_id : {},
    amount : {type :Number},
    address : {},
    email : String,
    receipt: String,
    phone : Number,
    status : {

        type: String,
        default : "Received",
        enum : ["Cancelled", "Delivered" ,"Shipped", "'Processing", "Received"]

    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamp:true});

const Order = mongoose.model("Order", OrderSchema)

module.exports = {Order}
