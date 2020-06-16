const address = require("../model/addressModel")
const user = require("../model/userModel")
module.exports = {

    Address: (req, res) => {
        if (!req.body.user_id) {
            res.send({ responseCode: 404, responseMessage: "User id is required !" });
        }
        else {
            new address(req.body).save((error, saved) => {
                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Address added successfully", saved })
                }
            })
        }
}
}