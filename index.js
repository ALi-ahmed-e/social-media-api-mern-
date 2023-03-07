const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")
const connectToDb = require("./config/connectToDB")
const helmet = require("helmet")
const port = process.env.PORT || 5000
const userRoute = require("./routes/user")
const postsRoute = require("./routes/post")

app.use(express.json())
app.use(cors())
app.use(helmet())
connectToDb()

app.use("/api/user",userRoute)
app.use("/api/posts",postsRoute)


app.get('/',(req,res)=>{})


app.listen(port, () => console.log('server started'))