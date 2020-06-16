const mongoose = require("mongoose")
const schema = mongoose.Schema
const userKey = new schema({

    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model("user", userKey, "user")