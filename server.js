//npm run dev
const path = require('path')
require('dotenv').config()


//express app
const express = require('express')
const app = express()

//mongoose
const mongoose = require('mongoose')
const carRouters = require('./routes/cars')



//middleware
//middleware parses data to be sent to the server (PUT/POST/PATCH)
app.use(express.json())

//middleware to show request path and method
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/cars', carRouters)

if(process.env.NODE_ENV === "production"){
    app.use(express.static("frontend/build"));
    app.get("*", (req, res) =>{
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
  }
  
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
        //listen for requests
        app.listen(process.env.PORT, ()=>{
        console.log ("connect to db & listening on", process.env.PORT)
})
})
.catch((error)=>{
    console.log(error)
})

