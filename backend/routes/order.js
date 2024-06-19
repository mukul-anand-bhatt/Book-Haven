const router = require("express").Router();
const {authenticationToken} = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const order = require("../models/order");
const User = require("../models/user")
//place order 

router.post("/place-order",authenticationToken, async (req,res)=>{
    try{
        const{id}=req.headers;
        const{Order}=req.body;

        for(const orderData of order){
            const newOrder = new Order({user:id,book:orderData._id});
            const orderDataFromDb = await newOrder.save();
            //saving Order in user model
            await UserActivation.findByIdAndUpdate(id,{
                $push: {orders:orderDataFromDb._id},
            });
            //clearing cart
            await UserActivation.findByIdAndUpdate(id,{
                $pull:{cart:orderData._id},
        });
    }
    return res.json({
        status:"Success",
        message:"Order placed Successfully"
    });
}catch(error){
    console.log(error);
    return res.status(500).json({message:"An error Occured"})
}
});


router.get("/getorderhistory",authenticationToken,async (req,res)=>{
    try{
        const{id}=req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
        });
        const orderData = userData.orders.reverse();
        return res.json({
            status:"Sucess",
            data:orderData,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"An error Occured"})
    }
});
module.exports = router;