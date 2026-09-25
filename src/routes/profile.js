

// const express = require('express');
// const { userAuth } = require('../middleware/auth');

// const profileRouter = express.Router();
const express = require('express');

const { userAuth } = require('../middleware/auth');

const User = require("../models/user");

const profileRouter = express.Router();

const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, (req, res) => { //The request first comes to userAuth.
    try {

        const user = req.user;
        console.log("LOGGED IN USER ID:", req.user._id); // 👈 ADD HERE

        res.send(user)//The user gets their profile
    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
});








profileRouter.get("/profile/:userId", userAuth, async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json(user);

    } catch (err) {
        console.log("VIEW USER PROFILE ERROR:", err.message);

        return res.status(400).json({
            message: err.message,
        });
    }
});


//Before the profile is edited, this middleware userauth, checks whether the user is logged in. 
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) { //This checks whether the user is trying to update only allowed fields.validateEditProfileData this from utils-validation
            throw new Error("Invalid Edit Request!");
        }

        const loggedInUser = req.user; //Get the currently logged-in user.

        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });

        await loggedInUser.save();//saves the updated data to MongoDB.

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully!`,
            data: loggedInUser
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = profileRouter;