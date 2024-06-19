const router = require("express").Router();
exports.router = router;
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
//add book to cart

router.put("/addtocart", authenticateToken , async (req,res)=>{
    try{
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);
        if(isBookinCart){
            return res.json({
                status:"Success",
                message:"Book already in cart"
            });
        }
        await User.findByIdAndUpdate(id,{
            $push:{cart:bookid}
        });
        return res.json({
            status:"Success",
            message:"Book added to cart",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occured"});
    }
});

router.put("/removefromcart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid }
        });

        return res.json({
            status: "Success",
            message: "Book removed to cart",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured" });
    }
});

router.get("/getusercart", authenticateToken, async (req,res)=>{
    try{
        const{id} = req.headers;
        const userData =await User.findById(id);
        const cart = userData.cart.reverse();

        return res.json({
            status:"Sucess",
            data:cart,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occured"});
    }
});

module.exports = router;