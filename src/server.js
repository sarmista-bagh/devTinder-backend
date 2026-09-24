

// const http = require("node:http")

// const server = http.createServer(function (req, res) {
//     res.end("Hello Nodejs")

// })

// server.listen(3000, () => {
//     console.log("Server is running on port no 3000")
// })





// const express = require('express');

// const app = express();

// // app.use("/", (req, res) => {
// //     res.send("base route")
// // })


// //This will only handle GET call to /user
// app.get("/user", (req, res) => {
//     res.send({ firstName: "Sarmista", lastName: "Bagh" });
// })

// //Post Api 
// app.post("/user", (req, res) => {
//     res.send("Data successfully saved to the database!")
// })
// app.patch("/user", (req, res) => {
//     res.send("Data successfully updated......")
// })
// app.delete("/user", (req, res) => {
//     res.send("Deteted Successfully!")
// })

// //This will match all the HTTP method API calls to /test
// app.use("/test", (req, res) => {
//     res.send("test request route..........")
// })




// app.listen(8888, () => {
//     console.log("Server is running on port:8888... ");
// })




// const express = require('express');

// const app = express();


// // //This will only handle GET call  to /user
// // app.get("/user", (req, res) => {
// //     console.log(req.query)
// //     console.log(req.query.name);
// //     console.log(req.query.age);
// //     res.send({ firstname: "Sarmista", lastname: "bagh" })
// // })

// app.get('/user/:userId/:name/:password',(req,res)=>{
//     console.log(req.params36)
//     res.send({name:"Sarmista",role:"fullstackd developer"})
// })



// // //saving data to DB
// // app.post('/user', (req, res) => {
// //     res.send("Data successfully saved to the database!")
// // })

// // app.delete('/user', (req, res) => {
// //     res.send("Deleted successfully");
// // })

// //This will match all the HTTP method API calls to /test
// // app.use("/", (req, res) => {
// //     res.send("handling the route here..")
// // })


// app.listen(8888, () => {
//     console.log("Server is running on port:8888");
// })






// //This will match all the HTTP method API calls to /test
// //Handle Auth Middleware for all GET,POST,....requests
// const { adminAuth, userAuth } = require("./middleware/auth")

// app.use('/admin', adminAuth)

// app.use('/user', userAuth)

// app.post('/user/login', (req, res) => {
//     res.send("user login succefully!")
// })

// app.get('/user/data', (req, res) => {
//     res.send('User data get!')
// })

// app.get("/admin/getAllData", (req, res) => {
//     res.send("All Data Sent!")
// })

// app.get('/admin/deleteUser', (req, res) => {
//     res.send("Deleted a data!")
// })
// //wildcart or this route matches to all route
// app.get('/', (err, req, res, next) => {
//     if (err) {
//         res.status(401).send("something went wrong!")
//     }

// })

// app.listen(7777, () => {
//     console.log("Server is running on port:7777");
// })

// //check if the request is authorizes

// //Logic of checking if the request is authorized

// //   // await mongoose.connect("mongodb+srv://sarmistabagh88_db_user:VFgATRTleG4x50Rx@devthinderdb.z8baco1.mongodb.net/devTinder");//this is databae name i added here - devTinder 


// //authentication
// const adminAuth = (req, res, next) => { //this fun was called 
//     console.log("Admin auth is getting checked.") //and we checked the admin auth
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz"; // the admin auth was authorized if the admin auth authorized than got to next()
//     //if my admin is not authorized i don't even want express to go to any route handler i will send message itself unauthorized from here only 
//     if (!isAdminAuthorized) {
//         res.status(404).send("Unauthorized admin request")
//     } else { // else
//         next() //so  it called than next()
//     }

// }


// const userAuth = (req, res, next) => {  //so it went to this over and send data back 
//     console.log("User auth is getting checked!")
//     const token = "super"
//     const isUserAuthorized = token === "sup"
//     if (!isUserAuthorized) {
//         res.status(404).send("Unauthorized user request");
//     } else {
//         next();
//     }
// }


// module.exports = {
//     adminAuth,
//     userAuth
// }