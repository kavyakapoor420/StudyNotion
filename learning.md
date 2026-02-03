concurrently 


 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "server": "cd server && npm run dev",
    "dev": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"npm start\" \"npm run server\""
  },



## during signup OTP sending logic 

### email from req.body -> check user already exists ->if yes return response -> else generate unique OTP -> store it in Db(otp)-> so that u can send it on emial of user for signup -> res send 


## signUp controller logic 

### data fetch from request ki body validate it match password(pass with confirm pass) -> then check user exists already with email or not-> then find most recent OTP stored for user validate OTP -> then hash password -> create entry of new user into DB 


http response status code -> what does that signigy and give some example 