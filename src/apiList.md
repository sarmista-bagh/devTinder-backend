#DevTinder APIs

##authRouter
- POST /signup
- POST /login
- POST /logout

##profileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCH /profile

##connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ingored/:userId
- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID

##userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed -Gets you the profiles of other users on platform


Status:ignore,interested,accepted,rejected