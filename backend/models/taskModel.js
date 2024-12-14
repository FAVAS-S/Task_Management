import mongoose from "mongoose";

const taskshema=mongoose.Schema({
    list:{
        type:String,
        required:true,   
    }
})

const taskModel = mongoose.model("list",taskshema)

export default taskModel