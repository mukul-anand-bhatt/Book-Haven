const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"Book"
    },
    status:{
        type:String,
        default:"orderplaced",
        enum:["orderplaced","shipped","delivered","cancelled"]
    }
},
{timestamps:true}
);
module.exports= mongoose.model("order",order);