const express = require ("express");
const app = express();
require("dotenv").config();
require("./conn/conn")

app.get("/",(req,res)=>{
    res.send("hello from backend")
})

app.listen(process.env.PORT,()=>{
    console.log(`server started at PORT ${process.env.PORT}`);
});
