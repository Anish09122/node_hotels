/*var fs=require('fs')
var os=require('os')
var user=os.userInfo();
console.log(user.username)
fs.appendFile('greeting.txt',' Hi '+user.username+'!',()=>console.log("File is Created"))
var notes=require('./notes.js')
console.log("Hello123")
var age=notes.age
console.log(notes.age)
var result=notes.addNumber(age+3,6)
console.log(result)*/
const db=require('./db')
const express = require('express')
const app = express()
const bodyParser=require('body-parser');
app.use(bodyParser.json());



app.get('/',(req, res)=>{
  res.send('Welcome to our hotel')
})

  
    const personRoutes=require('./routes/personRoutes')
    app.use('/person',personRoutes)
    const menRoutes=require('./routes/menuRoutes')
    app.use('/menu',menRoutes)
    
  
app.listen(3000,()=>{
  console.log("listening on port 3000")
})