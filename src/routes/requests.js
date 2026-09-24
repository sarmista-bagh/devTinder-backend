const express = require("express");

const { userAuth } = require("../middleware/auth");

const User = require("../models/user");

const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

//This is an Express.js API route for sending a connection request from one user to another. 
requestRouter.post(

    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {

        try {

            // Logged-in user's ID //Get the _id of the currently logged-in user and store it in fromUserId.
            const fromUserId = req.user._id;

            // Receiver's ID from URL
            const toUserId = req.params.toUserId;

            // Status from URL
            const status = req.params.status;


            // Allowed statuses
            const allowedStatus = ["ignored", "interested"];

            if (!allowedStatus.includes(status)) {
                return res.status(400).json({
                    message: "Invalid status type! " + status
                });
            }


            // Check if connection request already exists
            const existingConnectionRequest =
                await ConnectionRequest.findOne({
                    $or: [
                        {
                            fromUserId,
                            toUserId
                        },
                        {
                            fromUserId: toUserId,
                            toUserId: fromUserId
                        }
                    ]
                });


            if (existingConnectionRequest) {
                return res.status(400).json({
                    message: "Connection request already exists!"
                });
            }


            // Check whether receiver id exists
            const toUser = await User.findById(toUserId);

            if (!toUser) {
                return res.status(400).json({
                    message: "User not found"
                });
            }


            // If everything is valid, you create a new MongoDB document:
            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            });


            // Save request
            const data = await connectionRequest.save();


            res.json({
                message:
                    req.user.firstName +
                    " is " +
                    status +
                    " in " +
                    toUser.firstName,
                data
            });

        } catch (err) {

            res.status(400).send("ERROR: " + err.message);

        }
    }
);



requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const { status, requestId } = req.params;
       

        //validate the status
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed!" })
        }


        //find the loggedIn user in DB
        //"Find the connection request with this ID, where I am the receiver, and its current status is interested."
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",

        });
        if (!connectionRequest) {
            return res.status(400).json({ message: "connection Request not found!" });
        }
        //console.log("connection Request =", connectionRequest);


        connectionRequest.status = status;


        data = await connectionRequest.save();
        res.json({ message: "Connection Request" + status, data })

    } catch (err) {
        return res.status(400).send("ERROR" + err.message);
    }

})

module.exports = requestRouter;