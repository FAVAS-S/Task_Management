import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import taskRouter from "./router/taskRouter.js";
import mongodb from "./config/mongodb.js";
import cors from 'cors'


 const app = express()

 dotenv.config()

//  cors for accessing front to backend
 app.use(cors({
   credentials:true,
   origin:["http://localhost:5173","https://task-management-peach-eight.vercel.app"]
 }))
 app.use(express.json())
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:true}))

 app.get('/',(req,res)=>{
    return res.sendStatus(200)
 })
 

 app.use('/api',taskRouter)

 const Port = process.env.PORT || 3001

 
 app.listen(Port,()=>console.log(`http://localhost:${Port}`))