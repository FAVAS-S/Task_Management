import mongoose from "mongoose";
import taskModel from "../models/taskModel.js";

export const taskListAdd = async (req, res) => {
  const { list } = req.body;
  try {
    if (!list) {
      return res.json({ message: "Input field is required" });
    }

    const listes = new taskModel({
      list,
    });
    if (!listes) {
      return res.json({ message: "Something When wrong" });
    }

    await listes.save();
    return res.json({ message: "The lists added successfully" });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const taskGet = async (req, res) => {
  try {
    const data = await taskModel.find();
    if (data.length === 0) {
      return res.json({ message: "No Tasks" });
    }

    return res.json({ message: "fetch success", data });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const TaskGetById = async (req, res) => {
  try {
    const id = req.params.id;
    const idValidator = mongoose.Types.ObjectId.isValid(id);
    if (!idValidator) {
      return res.json({ message: "The Id Not valid" });
    }
    const Data = await taskModel.findById(id);
    if (!Data) {
      return res.json({ message: "The id is incorrect" });
    }

    return res.json({ message: "The Task is get by id", Data });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const TaskDelete = async(req, res) => {
  try {
    const Id = req.params.id;
    const idValidator= mongoose.Types.ObjectId.isValid(Id)
    if(!idValidator){
     return res.json({message:"The Id Not valid"})
    }

    const Data=  await taskModel.findByIdAndDelete(Id)
    if(!Data){
        return res.json({message:"While Deleting Something When Wrong"})
    }
     return res.json({message:"The Delete Task successfull"})
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const TaskUpdate= async(req,res)=>{
       try {
        const id = req.params.id
        const {list}= req.body
        const idValidator= mongoose.Types.ObjectId.isValid(id)
        if(!idValidator){
            return res.json({message:"The Id Not Valid"})
        }
        const Data = await taskModel.findByIdAndUpdate({_id:id},{list})

        if(!Data){
            return res.json({message:" While Updating Something When wrong"})
        }
        return res.json({message:"The Update Task is successfull",Data})


       } catch (error) {
        return res.json({message:error.message})
       }
}
