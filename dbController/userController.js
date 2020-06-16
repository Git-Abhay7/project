var user = require("../model/userModel")
var commonFunction = require("../commonFunction/commonFunction")
const bcrypt = require("bcrypt")

module.exports = {

    signUp: (req, res) => {

        var arr = ["firstName", "lastName", "email", "password"]
        var restrict = commonFunction.validation(arr, req.body)
        if (restrict) {
            res.send(`${restrict} is required !`)
        }
        else {
            var query = { $or: [{ email: req.body.email }], status: "ACTIVE" }
            user.findOne(query, (error, result) => {
                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
                }
                else if (result) {
                    if (result.email == req.body.email) {
                        res.send({ responseCode: 409, responseMessage: "Email already exist." })
                    }
                }
                else {
                    const saltRounds = 10;
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        req.body.password = hash
                        new user(req.body).save((error, saved) => {
                            if (error) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
                            }
                            else {
                                res.send({ responseCode: 200, responseMessage: "Signup successfully", saved })
                            }
                        })
                    });
                }
            })

        }
    },

    changePassword: (req, res) => {

        if (!req.body.email) {
            res.send({ responseCode: 404, responseMessage: "Email is required !" });
        } else {
            user.findOne({ email: req.body.email }, (error, result) => {
                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
                }
                else if(!result){
                    res.send({responseCode:404,responseMessage:"User not found."})
                }
                else {
                    bcrypt.compare(req.body.password, result.password, (error, pass) => {
                        if (pass == false) {
                            res.send("your password doesnot match")
                        }
                        else {

                            if (req.body.newPassword != req.body.confirmPassword) {
                                return res.send("your new and confirm password doesnot matched.")
                            }
                            else {
                                const saltRounds = 10;
                                bcrypt.hash(req.body.newPassword, saltRounds, function (err, hash) {
                                    req.body.newPassword = hash;
                                    user.findOneAndUpdate({ email: result.email }, { $set: { password: req.body.newPassword }, new: true }, (updateError, updateResult) => {
                                        if (updateError) {
                                            res.send({ responseCode: 500, resonseMessage: "Internal server error" });
                                        }
                                        else {

                                            return res.send({ responseCode: 200, responseMessage: "Password changed Successfully.", updateResult });
                                        }
                                    })

                                })
                            }
                        }
                    })
                }
            })
        }
    },
    listAllUser: (req, res) => {

        user.find({}, (error, result) => {
            if (error) {
                res.send("Something went wrong.");
                next();
            }
            res.json(result)
        })
    },
    deleteUser: (req, res) => {

        user.findOneAndDelete({ email: req.params.email }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error." })
            }
            else if(!result){
                res.send({responseCode:404,resonseMessage:"User not found."})
            }
            else {
                res.send({ responseCode: 200, responseMessage: "User Deleted." })

            }
        })

    },

    editUser: (req, res) => {
        user.findById({ _id: req.body._id }, { status: "ACTIVE" }, (findError, findResult) => {
            if (findError) {
                res.send({ responseCode: 500, resonseMessage: "Internal server error", findError });
            } else if (!findResult) {
                res.send({ responseCode: 404, resonseMessage: " User Not found." });
            } else {
                var obj = {};
                if (req.body.firstName) {
                    obj.firstName = req.body.firstName;
                }
                if (req.body.lastName) {
                    obj.lastName = req.body.lastName;
                }

                var check = {
                    $and: [
                        { email: req.body.email },
                        { _id: { $ne: { _id: findResult._id } } }
                    ]
                }
                user.findOne(check, (checkError, checkResult) => {
                    if (checkError) {
                        res.send({ responseCode: 500, resonseMessage: checkError });
                    }
                    else if (checkResult) {

                        if (checkResult.email == req.body.email) {
                            res.send({
                                responeCode: 409,
                                responseMessage: "Email already exist"
                            });
                        }
                    } else {

                        if (req.body.email) {
                            obj.email = req.body.email;
                        }
                        user.findByIdAndUpdate(
                            { _id: req.body._id },
                            { $set: obj },
                            { new: true },
                            (updateError, updateResult) => {
                                if (updateError) {
                                    res.send({
                                        responeCode: 500,
                                        resonseMessage: "Internal server error!"
                                    });
                                } else {
                                    res.send({
                                        responseCode: 200,
                                        resonseMessage: "Profile updated.",
                                        Result: updateResult
                                    });
                                }
                            }
                        );
                    }
                });
            }
        })
    }
}