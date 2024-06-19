const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// add book to favourite 
router.post("/addbooktofavourite", authenticateToken, async (req, res) => {
    console.log(body);
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

module.exports = router;
