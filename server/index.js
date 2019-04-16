var express = require('express')
var bodyparser = require('body-parser')
var session = require('express-session')
var app = express()

var mongoose = require('mongoose')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    
  }))

mongoose.Promise = Promise

mongoose.connect('mongodb://localhost:27017/angular')
.then( () => console.log("Successfully DB connect "))

const User = require('./Models/user')

app.use(bodyparser.json())

app.post('/api/login', async (req, res) => {
    const { email ,password } = req.body
    console.log(email,password)

    const resp =  await User.findOne({email,password})
    if(!resp){
        console.log("Incorrect details")
        res.json({
            success: false,
            message:"Incorrect details"
        })
    } else {
        res.json({
            success: true
           // message:" Logging Sucessfully"
        })
        req.session.user = email
        req.session.save()
        console.log(" Logging Sucessfully ")      
    }  
})

app.post ('/api/quote' , async (req,res) => {
    console.log(req.session.user , req.body.value)
    const user = await User.findOne({email: req.session.user})

    if(!user){
        res.json({
            success: false,
            message:"Incorrect details"
        })
      return
    }
    await User.update({email: req.session.user}, { $set: { quote: req.body.value }})
    res.json({
         success: true
    })
})

app.post('/api/register', async (req, res) => {   
    const {email , password } = req.body

    const exit =  await User.findOne({email})

    if(exit){
        res.json({
            success: false,
            message: "Email Allready Use"
            })
        return
        } 

    const user = new User({
        email,
        password
    })

    const result = await user.save()
        console.log(result)    
        res.json({
            success: true,
            message:"Welcome!"
        })
})

app.get('/api/isLoggedIn' ,(req, res) => {
    res.json({
        status: !!req.session.user
    })
})



app.get('/api/data',async (req, res) => {
    console.log(req.session)
//   res.send('user =>'+req.session.user)
    const user =  await User.findOne({email: req.session.user})

    if(!user){
        res.json({
            status: false,
            message: "User was deleted"
        })
        return
    }

   res.json({
       status:true,
       email: req.session.user,
       quote: user.quote
   })
    
})

app.get('/api/logout',(req, res) => {
    
    req.session.destroy()
    res.session.json({
        success :true 
        })
})

app.listen(1234 , () => console.log("Server  listening at 1234 "))