const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth")
// signup
router.post("/signup", async (req, res) => {
    // console.log(req.body)
    try {
        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater than 5" });
        }
        const hashPass = await bcrypt.hash(password,10);

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address
        });
        
        await newUser.save();

        return res.status(200).json({ message: "Signup Successful!!" });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Sign in 
router.post("/signin", async (req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username: username})
        if (!user){
            return res.status(400).json({message: "User not found"})
            };
        const validPass = await bcrypt.compare(password, user.password)
        if (validPass){
            const authClaims =[
                {name:user.username},
                {role: user.role}
            ]
            const token = jwt.sign({authClaims},"bookstore123",{
                expiresIn:"1d"
            });
            return res.status(200).json({id: user._id, role: user.role,token: token});
        }
        else{
            return res.status(400).json({message: "Invalid password"})
        }
    }
    catch(error){
        console.error("Error during signin",error);
        res.status(500).json({message:"Internal Server error"});
    }
});

//get user information 
router.get("/userinfo", authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
});

router.put("/updateadd", authenticateToken , async (req,res)=>{
    try{
        const{id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address Updated Successfully"})
    }
    catch{
        res.status(500).json({message:"Internal Server Error"})
    }
})

module.exports = router;
