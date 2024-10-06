require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.js')
const blogRoutes = require('./routes/blog.js')
const app = express();


app.use(cors())

app.use(express.json())  //to send req.body in json format

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Server Connected Successfully")
})
.catch(e => {
    console.log(e)
})

//User Routes
app.use('/api/auth', authRoutes)


//Blog Routes
app.use('/api/blogs', blogRoutes)




const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Backend server is running on port ${PORT}`)
})
