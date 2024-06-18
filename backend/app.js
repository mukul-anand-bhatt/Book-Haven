const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn"); // Ensure this connects to your database correctly
const user = require("./routes/user");
const book = require("./routes/book")
// Middleware to parse JSON requests
app.use(express.json());

// Use the correct base path for your routes
app.use("/api/v1", user);
app.use("/api/v1", book);

const port = process.env.PORT || 3000; // Default to port 3000 if not specified in .env
app.listen(port, () => {
    console.log(`Server started at PORT ${port}`);
});
