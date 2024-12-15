import express from "express";
import {  TaskDelete, taskGet, TaskGetById, taskListAdd, TaskUpdate } from "../controller/taskController.js";

const taskRouter = express.Router();


// router for api
taskRouter.post("/list", taskListAdd);
taskRouter.get('/list',taskGet)
taskRouter.get('/listes/:id',TaskGetById)
taskRouter.delete('/list/:id',TaskDelete)
taskRouter.put('/list/:id',TaskUpdate)

export default taskRouter;
