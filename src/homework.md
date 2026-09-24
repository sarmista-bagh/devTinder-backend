-Create a repository
- Initialize the repository
- node_module,package.json,package-lock.json
- Install Express
- Create a server
- Listen to port 7777
- Write request handlers for /test , /hello
- Install nodemon and upadete scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^/~)
- initialize git
- gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extension ex /hello,/hello/2, /zyz
- Order of the routes matter a lot
- Install postman app and make a workspace/collection > test API call
- Write logic to handle GET,POST,PUT,PATCH,DELETE API Calls and test them on postman
-Expolre routing and use of? ?,+,(),* in the routes
- Use of regex in routes /a/,/.*fly$/
- Reading the query params in the routes 
- Reading the dynamic routes
- Multiple Route Handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/",rH,[rH2,rH3],rH4,rH5)

- what is middileware
- How express JS basically handles requests behind the scenes
- Difference app.use and app.all

- Write a dummy auth middleware for admin
- Write a dummy auth middileware for all user routes,except /user/login
- Error Handling using app.use("/", (err,req,res,next)={}),


- Create a free cluster on MongoDB official website (Mongo Atlas)
- Instiall mongoose library
-Connect your application to the Database "Connection-url"/devTinder

-Call the connectDB function and connect to database before starting application on 7777 
- Create a u userSchema & user model
- Create POST api call /signup Api to add data to database
- Push some documents using API calls from postman 

- Error handling using try catch
- Js object vs JSON (difference)
- Add the express.json middleware to your page
- Make your signup API dynamic to recive data from the end user
- User.findOne with duplicate email ids,which object returned
-API -Get user by email
- API -Feed API GET/feed - get all the users from the database
- API - Get user by Id
- Create a delete user Id
- Differecnce between PATCH abd Put
- API - Update a user
- Explore the mongoose Documentation for model methods
- What are options in a Model.findOneUpdate method, explore more about it
-API - Update the user with email ID
- Explore schematype options from the documentions
- Add required,unique,lowercase, min,minLength ,trim
- Add default
- Create a custom validate function for gender
-Improve the DB schema - PUT all appropate validations on each field in schema
- Add timestamps to the userSchema
- Add API level validation on patch request & signup post api
- DATA Sanitizing - Add API validation for each field 
-Install validator
- Explore validator library function and use validator func for password,email,photURl
- NEVER TRUST req.body
- validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is excrupted password
- Create login API
- Compare passwords and throw errors if email or password is invalid
- install cookie-parser
- just send a dummy cookie to user
-Create GET/profile API and check if you get the cookie back
- install jsonwebtoken
- In login API,after email and password validation create a jwt token and send it to user in kookies
-read the cookies inside your profile API and find the logged in user  
- userAuth Middleare
- Add the userAuth middleware in profile API and new sendconnectionrequest API
- set the expirey of jwt token and cookies to 7 day
- Create userSchema method to getJET()
- Create userSchema method to comparePassword



-Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read Decoumentation for express.Router
-Creates route folder for managing auth,profile request routers
-create authRouter,profileRouter,requestRouter
- Import these routers in app.js

- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API =>forget password API
- 

-Create Connection sehema request
-Send connection request API
- Proper validation of Data
- Think about All corner cases
-$or query &and query in mongoose - https://www.mongodb.com/docs/manual/core/indexes/

query-logical/
---------------
- schema.pre("save) function
-Read more about indexes in MongoDB
- Why do we need index in DB?
- What is the advantages and disadvantages of creating?
- Read this articles about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/

index-types/index-compound/
===============================
-ALWAYS THINK ABOUT CORNER CASES

-Write code with proper validations for POST /request/review/:status/:requestId
- Through process -POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/receives with all the checks
- Create GET GET /user/connections
-Logic for GET /feed API
- Explore the $nin,$ne , and other  Comparesion query operator




