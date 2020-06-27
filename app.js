const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const app = express()

const courses = [
        {
            id:1,
            name:"Course1"
        },
        {
            id:2,
            name:"Course2"
        },
        {
            id:3,
            name:"Course2"
        }
        
]
console.log(`NODE_ENV:`,process.env.NODE_ENV)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())
app.use((req, res, next) => {
    console.log("LOGGING.....")
    next()
})

mongoose.connect("mongodb://localhost/genre")
        .then(() => console.log("DB CONNTECTED..."))
         .catch(err =>console.log(err.message))
app.get("/", (req, res) => {
    res.json("GET REQUEST SENT")
})
app.get("/api/course", (req, res) => {
    res.json(courses)
})

/** reqd query parameters */
app.get("/api/course/:id", (req, res) => {
    console.log(req)
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
        return res.status(404).json("NO COURSE")
    }
    res.json(course)

})

app.post("/api/course", (req, res) => {
    const {name} = req.body
    const course = {
        id:courses.length + 1,
        name
    }
    courses.push(course)
    res.json(courses)
    // res.json("POST REQUEST SENT")


})


const port = process.env.PORT || 3333
app.listen(port, (req, res) => {
    console.log(`SERVER RUNNING ON PORT ${port}`)
})