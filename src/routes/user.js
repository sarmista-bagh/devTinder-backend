const express = require('express');
const { userAuth } = require('../middleware/auth');
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName about skills photoURL"
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');

// Get received connection requests
userRouter.get("/user/request/received", userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user;

        //get all the pending connection request for the loggedIn user
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);
        //}).populate("fromUserId",["firstName","lastName","about"])

        res.json({ message: "Data fetch successfully", data: connectionRequest })
    } catch (err) {
        res.status(400).send("message" + err.message)
    }
})


// // Get accepted connections

// userRouter.get("/user/connections", userAuth, async (req, res) => {
//     try {


//         const loggedInUser = req.user;

//         const connectionRequest = await ConnectionRequest.find({
//             $or: [
//                 { toUserId: loggedInUser._id, status: "accepted" },
//                 { fromUserId: loggedInUser._id, status: "accepted" },
//             ]

//         }).populate("fromUserId", USER_SAFE_DATA)
//             .populate("toUserId", USER_SAFE_DATA);

//       //  const data = connectionRequest.map((row) => row.fromUserId); //Old data
//         const data = connectionRequest.map((row) => {
//             if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
//                 return row.toUserId;
//             } else {
//                 return row.fromUserId;
//             }
//         });
//         res.json({ data });

//         // const data = connectionRequest
//         //     .map((row) => {
//         //         if (!row.fromUserId || !row.toUserId) {
//         //             return null;
//         //         }

//         //         if (
//         //             row.fromUserId._id.toString() ===
//         //             loggedInUser._id.toString()
//         //         ) {
//         //             return row.toUserId;
//         //         } else {
//         //             return row.fromUserId;
//         //         }
//         //     })
//         //     .filter((user) => user !== null);
//     } catch (err) {
//         res.status(400).send({ message: err.message })
//     }
// })

// Get accepted connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {
                    toUserId: loggedInUser._id,
                    status: "accepted",
                },
                {
                    fromUserId: loggedInUser._id,
                    status: "accepted",
                },
            ],
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest
            .map((row) => {
                // User was deleted from database
                if (!row.fromUserId || !row.toUserId) {
                    return null;
                }

                // If logged-in user is the sender,
                // return the receiver
                if (
                    row.fromUserId._id.toString() ===
                    loggedInUser._id.toString()
                ) {
                    return row.toUserId;
                }

                // Otherwise return the sender
                return row.fromUserId;
            })
            .filter((user) => user !== null);

        res.json({ data });
    } catch (err) {
        console.error("Error fetching connections:", err);

        res.status(400).send({
            message: err.message,
        });
    }
});


userRouter.get("/feed", userAuth, async (req, res) => {

    try {

        const loggedInUser = req.user;

        //find all the connection request (sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
        }).select("fromUserId toUserId")         //or check the fromuserId and toUserId  }).select("fromUserId toUserId").populate("fromUserId", "firstName").populate("toUserId","firstName")


        //These four people are the people whom i want to hide from my feed
        const hideUsersFromFeed = new Set();

        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        //console.log(hideUserSFromFeed);

        // i am finding except all the users who id is not present in hideUserFromFeed 
        //All the users Who ID is not present in the hideUserFromFeed i am finding others ID

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        }).select(USER_SAFE_DATA);

        res.send(users)






        res.send(connectionRequests);

    } catch (err) {
        res.status(400).send("message:" + err.message)
    }
})

module.exports = userRouter;