const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")
const connectToDb = require("./config/connectToDB")
const helmet = require("helmet")
const port = process.env.PORT || 5000
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postsRoute = require("./routes/post")
const cookieParser = require("cookie-parser");
// const multer = require('multer')
app.use(express.json({
    limit: '50mb'
  }));
app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.use(helmet())
connectToDb()

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage });
//   app.post("/api/upload", upload.single("file"), (req, res) => {
//     try {
//       return res.status(200).json("File uploded successfully");
//     } catch (error) {
//       console.error(error);
//     }
//   });
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/posts", postsRoute)



app.listen(port, () => console.log('server started'))