import mongoose from "mongoose";

// mongodb model create
const taskshema=mongoose.Schema({
    list:{
        type:String,
        required:true,   
    }
})

const taskModel = mongoose.model("list",taskshema)

export default taskModel