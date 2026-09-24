

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        //Read the token from the req.cookies
        const { token } = req.cookies;
        if (!token) {
           // throw new Error("Token is not valid!!!!!!!!");
           throw res.status(401).send("Please Login!!!")
        }
        //Validate the token
        const decodedObj = await jwt.verify(token, "DEV@Tinder$790");//.checks that the token was signed with the correct secret and is valid.

        //Find the user

        const { _id } = decodedObj;

        const user = await User.findById(_id);//"MongoDB, find the user whose _id is the _id from the verified JWT."
        //console.log("UserId Found" + user);

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user; //Store user inside req and then The user gets their profile.

        next();// move to the next middleware/route handler or Authentication is successful. Continue to the next middleware or route handler.”
    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }

}

module.exports = {

    userAuth
}