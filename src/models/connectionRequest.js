const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",//refrence to the user connection
            required: true
        },

        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },

        status: {
            type: String,
            required: true,

            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`
            }
        }
    },

    {
        timestamps: true
    }
);


// Check whether user is sending request to themselves
connectionRequestSchema.pre("save", function () {

    const connectionRequest = this;

    if (
        connectionRequest.fromUserId.equals(
            connectionRequest.toUserId
        )
    ) {
        throw new Error(
            "Cannot send connection request to yourself"
        );
    }

});


const ConnectionRequestModel = mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);


module.exports = ConnectionRequestModel;