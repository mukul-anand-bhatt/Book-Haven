const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        default:"https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png",
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    favourites:[
        {
            type: mongoose.Types.ObjectId,
            ref: "books"
        }
    ],
    cart:[
        {
            type: mongoose.Types.ObjectId,
            ref: "books"
        }
    ],
    orders:[
        {
            type: mongoose.Types.ObjectId,
            ref: "orders"
        }
    ]
},
{timestamps: true}
)
module.exports = mongoose.model("user" , user);