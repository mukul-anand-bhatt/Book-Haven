const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// add book to favourite 
router.put("/addbooktofavourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id); 
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in Favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } }); 
        return res.status(200).json({ message: "Book added to favourites" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server Error" });
    }
});
router.put("/removefromfav",authenticateToken, async (req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
    }
    return res.status(200).json({message:"Book removed from favourites"});
}
catch{
    res.status(500).json({message:"Internal server Error"});
}
});

router.get("/getfavbooks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ message: "User ID is required in headers" });
    }

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
   
    const favBooks = userData.favourites;
    return res.json({
      status: "Success",
      data: favBooks
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error Occurred. Please try Again" });
  }
});


module.exports = router;