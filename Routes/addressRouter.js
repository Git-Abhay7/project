var router = require("express").Router()
var addresscontroller = require("../dbController/addressController")

router.post('/address',addresscontroller.Address)

module.exports=router;