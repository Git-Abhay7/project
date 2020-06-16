var router = require("express").Router()
var usercontroller = require("../dbController/userController")

router.post("/addUser",usercontroller.signUp)
router.post("/changePassword",usercontroller.changePassword)
router.get("/allUsers",usercontroller.listAllUser)
router.delete("/deleteUser/:email",usercontroller.deleteUser)
router.post("/editUser",usercontroller.editUser)



module.exports=router;
   