const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');//bcrypt is used to hash passwords and later compare passwords.

const authRouter = express.Router();
const isPasswordValid = require("../models/user")
const getJWT = require("../models/user")
const jwt = require('jsonwebtoken');
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    //console.log(req.body)
    try {
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        //Encrypt the password..10 is the number of salt rounds, also called the cost factor
        //Take the password → bcrypt creates a random salt → perform the configured amount of work (10) → produce the password hash.
        const passwordHash = await bcrypt.hash(password, 10);
        //console.log(passwordHash);

        //Creaeting a new instance of the User model/
        // /Create a new User document using by User schema
        const user = new User({ firstName, lastName, emailId, password: passwordHash })// new User(...) creates a new Mongoose document in memory.


        const saveUser = await user.save()//Take that Mongoose document and save it into MongoDB. //await Wait for user.save() to finish before moving to the next line.
        const token = await saveUser.getJWT();
        res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000), });
        res.json({ message: "User added successfully!", data: saveUser });
    } catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }

});



authRouter.post("/login", async (req, res) => {
    try {

        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });//Find one user whose emailId matches the email the client provided
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        // Only correct password reaches here
        const token = await user.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        return res.status(200).json({
            message: "Login successful",
            user,
        });

        // // const isPasswordValid = await bcrypt.compare(password, user.password);
        // const isPasswordValid = await user.validatePassword(password); //This validatePassword is coming from user.j model
        // if (isPasswordValid) {

        //     //Create a jwt token
        //     // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", { expiresIn: "7d", });//sign() creates a JWT.
        //     const token = await user.getJWT();//This getJWT() is coming from user.js model
        //     // console.log(token);

        //     //Add the token to cookies and send the response back to the user
        //     // res.cookie("token","ddjddjejdijwiowkfnsdjsdndjwbdwuijewiodmvnpoebwjfas");//hardcoded token it is

        //     res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) })//Put JWT into cookie


        //     // console.log("✅ Sending response");

        //     return res.status(200).json({
        //         message: "Login successful",
        //         user
        //     });


        // }

    } catch (err) {
        // res.status(400).send("ERROR:" + err.message);
        res.status(400).json({
            message: err.message,
        });
    }
})


//Logout api

authRouter.post("/logout", (req, res) => {
    res
        .cookie("token", null, {
            expires: new Date(Date.now()),

        })
        .send("LogOut Successfully!")
})

module.exports = authRouter;