import express from "express" 
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import {connectDB} from "./databases/db.js"
import {config} from "dotenv"

config({
  path: "./config.env"
})
const app = express()
connectDB()
app.use(cors({
    origin: '*'
  }));
  
  app.use(express.json())
  app.use(cookieParser())
  app.use("/user",userRouter)
  app.use("/task",taskRouter)

  app.get("/", (req,res)=>{
    res.end("Secure")
  })

  app.listen(4000, ()=>{
    console.log("Server is running on http://127.0.0.1:4000")
  })