const express = require("express");//Express is a Node.js framework used to create your server and APIs.

const connectDB = require("./config/database"); // connectDB() connects your application to MongoDB.
const bcrypt = require('bcrypt'); //bcrypt is used to hash passwords and later compare passwords.
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const { validateSignUpData } = require('./utils/validation')
const User = require("./models/user");
const { userAuth } = require("./middleware/auth");

app.use(express.json()); // converting JSON data into JavaScript object middleware express.json() 
app.use(cookieParser());//here app.use(cookieParser());



app.post("/signup", async (req, res) => {
    // console.log(req.body);
    try {
        //Valadation of Data
        validateSignUpData(req)

        const { firstName, lastName, emailId, password } = req.body;
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10); 
        console.log(passwordHash);

        // Creating a new instance of the User Model
        const user = new User({ firstName, lastName, emailId, password: passwordHash }); // new User(...) creates a new Mongoose document in memory.


        await user.save(); //Take that Mongoose document and save it into MongoDB. //await Wait for user.save() to finish before moving to the next line.

        res.send("User added Successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

app.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });//Find one user whose emailId matches the email the client provided
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            //Create a jwt token
            const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", { expiresIn: "7d", });//sign() creates a JWT.
            console.log(token);
            //Add the token to cookies and send the response back to the user
            // res.cookie("token","ddjddjejdijwiojsiwwswnddddddnedjlllllllssssas");//hardcoded token itis
            res.cookie("token", token, {   expires: new Date(Date.now() + 8 * 3600000) });//Put JWT into cookie

            res.send("Login Successfully!")
        }
        else {
            throw new Error("Invalid credentials")
        }
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
})

app.get('/profile', userAuth, async (req, res) => { //The request first comes to userAuth.
    try {
        const user = req.user;
        res.send(user);//The user gets their profile.
    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }

})

app.post("/sendconnectionrequest", userAuth, async (req, res) => {

    const user = req.user;

    console.log("Sending a connection request!")
    res.send(user.firstName + "Sent the connection request!")
})


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





    const express = require("express");//Express is a Node.js framework used to create your server and APIs.
    
    const connectDB = require("./config/database"); // connectDB() connects your application to MongoDB.
    const bcrypt = require('bcrypt'); //bcrypt is used to hash passwords and later compare passwords.
    
    const jwt = require('jsonwebtoken');
    const cookieParser = require("cookie-parser")
    const { validateSignUpData } = require('./utils/validation')
    const User = require("./models/user");
    const { userAuth } = require("./middleware/auth");
    const isPasswordValid = require("./models/user")
    const getJWT = require("./models/user")
    app.use(express.json()); // converting JSON data into JavaScript object middleware express.json() 
    app.use(cookieParser());//here app.use(cookieParser());
    
    
    
    app.post("/signup", async (req, res) => {
        // console.log(req.body);
        try {
            //Valadation of Data
            validateSignUpData(req)
    
            const { firstName, lastName, emailId, password } = req.body;
            //Encrypt the password
            const passwordHash = await bcrypt.hash(password, 10);
            console.log(passwordHash);
    
            // Creating a new instance of the User Model
            const user = new User({ firstName, lastName, emailId, password: passwordHash }); // new User(...) creates a new Mongoose document in memory.
    
    
            await user.save(); //Take that Mongoose document and save it into MongoDB. //await Wait for user.save() to finish before moving to the next line.
    
            res.send("User added Successfully");
        } catch (err) {
            res.status(400).send("Error saving the user: " + err.message);
        }
    });
    
    app.post("/login", async (req, res) => {
    
        try {
            const { emailId, password } = req.body;
            const user = await User.findOne({ emailId: emailId });//Find one user whose emailId matches the email the client provided
            if (!user) {
                throw new Error("Invalid Credentials")
            }
            // const isPasswordValid = await bcrypt.compare(password, user.password);
            const isPasswordValid = await user.validatePassword(password);
            if (isPasswordValid) {
                //Create a jwt token
                // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", { expiresIn: "7d", });//sign() creates a JWT.
                const token = await user.getJWT(); //This token is coming from model 
                console.log(token);
                //Add the token to cookies and send the response back to the user
                // res.cookie("token","ddjddjejdijwiojsiwwswnddddddnedjlllllllssssas");//hardcoded token itis
    
                res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });//Put JWT into cookie
    
                res.send("Login Successfully!")
            }
            else {
                throw new Error("Invalid credentials")
            }
        } catch (err) {
            res.status(400).send("ERROR " + err.message);
        }
    })
    
    app.get('/profile', userAuth, async (req, res) => { //The request first comes to userAuth.
        try {
            const user = req.user;
            res.send(user);//The user gets their profile.
        } catch (err) {
            res.status(400).send("ERROR" + err.message);
        }
    
    })
    
    app.post("/sendconnectionrequest", userAuth, async (req, res) => {
    
        const user = req.user;
    
        console.log("Sending a connection request!")
        res.send(user.firstName + "Sent the connection request!")
    })
    
    
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