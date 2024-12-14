import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()


export default mongoose.connect(process.env.MONGODB)
.then(()=>{
    console.log("The mongodb Connection success");
    
}).catch((e)=>{
    console.log(e.message);
    
    console.log('The mongodb connection failed');
    
})
 