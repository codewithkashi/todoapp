import express from "express"
import { newTask, isAuthenticated, allTasks, updateTask, delTask } from "../controllers/task.js"
const taskRouter = express.Router()
taskRouter.post("/new",isAuthenticated, newTask)
taskRouter.get("/all",isAuthenticated, allTasks)
taskRouter.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, delTask)
export default taskRouter