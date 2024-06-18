const router = require("express").Router();
const User = require("../models/user");

// signup
router.post("/signup", async (req, res) => {
    console.log(req.body)
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

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            address: address
        });
        console.log(username)
        console.log(password)
        console.log(email)
        console.log(address)
        await newUser.save();

        return res.status(200).json({ message: "Signup Successful!!" });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
