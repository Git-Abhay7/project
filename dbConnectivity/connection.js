const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/database",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection
 .once('open',()=>{console.log("Database created")})
 .on('error',error=>{console.log("Error occured.")})