const mongoose = require("mongoose")
const schema = mongoose.Schema
const addressKey = new schema({
    location: {
        type: String
    },
    pincode:{
        type:Number
    },
    user_id:{
        type: schema.Types.ObjectId,
        ref: "user"
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model("address", addressKey, "address")