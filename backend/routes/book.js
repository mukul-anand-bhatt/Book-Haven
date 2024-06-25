const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const  Book = require("../models/book")
const {authenticateToken} = require("./userAuth")

//add book -- admin
router.post("/addBook", authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role!=="admin"){
            return res.status(401).json({message:"You are not Admin"})
        }
        const book = new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        });
        await book.save();
        res.status(201).json("Book added successfully");
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
});
router.put("/updatebook",authenticateToken,async(req,res)=>{
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        });
        return res.status(200).json({
            message:"Book Updated Successfully"
        });
    }
    catch(error){
        return res.status(500).json({message:"An Error occured"})
    }
});
router.delete("/deletebook",authenticateToken,async(req,res)=>{
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({
            message:"Book Deleted Successfully"
        });
    }
    catch{
        return res.status(500).json({message:"An Error Occured"});
    }
})
router.get("/getallbooks", async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAt:-1});
        return res.json({
            status:"Sucess",
            data:books,
        });
    }
    catch(error){
        res.status(500).json({message:"An error occured"});
    }
});
router.get("/getrecentbooks",async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAt:-1}).limit(4);
        return res.json({
            status:"Sucess",
            data:books,
        });
    }
    catch(error){
        res.status(500).json({message:"An error occured"});
    }
});
router.get("/getbookbyid/:id", async(req,res)=>{
    try{
        const{id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            status:"Success",
            data:book,
        });
    }
    catch(error){
        return res.status(500).json({message:"An error Occured"})
    }
})

module.exports=router;