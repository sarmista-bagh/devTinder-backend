const express = require("express");

const connectDB = require("./config/database"); // database connect here

const app = express();

const User = require("./models/user");

app.use(express.json()); // converting JSON data into JavaScript object middleware

app.post("/signup", async (req, res) => {
    // console.log(req.body);

    // Creating a new instance of the User Model
    const user = new User(req.body);

    try {
        await user.save(); // save the data into the database

        res.send("User added Successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});


// Get user by email

app.get("/employe", async (req, res) => {

    try {
        const user = await User.findOne({
            emailId: "babu@gmail.com"
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(user);

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});




//Feed API - GET /feed - get all the users from the database

// app.get('/feed', async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.send(users)
//     } catch (err) {
//         res.status(400).send("Something went to wrong!")
//     }
// });

/*
const user = new User({
  firstName: "babu",
  lastName: "bagh",
  emailId: "babu@gmail.com",
  password: "babu@123",
});
*/

// Creating a new instance of the User model
// const user = new User(userObj);

connectDB()
    .then(() => {
        console.log("Database connection established...");

        app.listen(7777, () => {
            console.log("Server is running on port: 7777");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!", err.message);
    });