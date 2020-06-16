const express = require("express")
const bodyParser=require("body-parser")
const app = express();
const port = 7000;
require("./dbConnectivity/connection")


const userRoute= require("./Routes/userRoutes")
const addressRoute = require("./Routes/addressRouter")
app.get('/',(req,res)=>{
    res.send("<h1>SERVER IS RUNNING SMOOTHLY </h1>")
})
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/user",userRoute)
app.use("/userAddress",addressRoute)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})