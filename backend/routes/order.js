const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Order = require("../models/order");
const Book = require("../models/book");

//place order 

router.post("/placorder",authenticateToken, async (req,res)=>{
    try{
        const{id}=req.headers;
        const{Order}=req.body;

        for(const orderData of Order){
            const newOrder = new Order({user:id,book:orderData._id});
            const orderDataFromDb = await newOrder.save();
            //saving Order in user model
            await User.findByIdAndUpdate(id,{
                $push: {orders:orderDataFromDb._id},
            });
            //clearing cart
            await User.findByIdAndUpdate(id,{
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


router.get("/getorderhistory",authenticateToken,async (req,res)=>{
    try{
        const{id}=req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
        });
        const orderData = userData.Orders.reverse();
        return res.json({
            status:"Sucess",
            data:orderData,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"An error Occured"})
    }
});


router.get("/getallorder",authenticateToken, async(req,res)=>{
    try{
        const userData = await Order.find()
        .populate({
            path:"book",
        })
        .populate({
            path:"user",
        })
        .sort({ createAt: -1});
        return res.json({
            status:"Sucess",
            data:userData,
            });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error Occured"});
    }
});

router.put("/updatestatus/:id",authenticateToken,async (req,res)=>{
    try{
        const {id} = req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"Sucess",
            message:"Order Status Updated Sucessfully"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"An Error Occured"});
    }
});
module.exports = router;