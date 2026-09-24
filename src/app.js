const express = require("express");//Express is a Node.js framework used to create your server and APIs.

const connectDB = require("./config/database"); // connectDB() connects your application to MongoDB.

const app = express();
const cookieParser = require("cookie-parser")

const cors = require("cors");

app.use(express.json()); // converting JSON data into JavaScript object middleware express.json() 
app.use(cookieParser());//here app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
    .then(() => {
        console.log("Database connection established...");

        app.listen(7777, () => {
            console.log("Server is successfully listening on port: 7777");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!", err.message);
    });