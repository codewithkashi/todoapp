import Task from "../models/task.js"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    try {
        const cookie = req.cookies.token
        if (!cookie) {
            res.json({
                success: false,
                message: "Login First"
            })
            return
        }
        const token = jwt.verify(cookie, "kashif")
        req.user = await User.findById(token._id)
        if (!req.user) {
            res.json({
                success: false,
                message: "Invalid Cookie"
            })
            return
        }
        next()
    } catch (error) {
        res.json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
export const newTask = async (req, res) => {
    try {
        const { title, description } = req.body
        const user = req.user
        await Task.create({
            title,
            description,
            user
        })
        res.json({
            success: true,
            message: "Task Created"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Internal Server Error"
        })
    }

}


export const allTasks = async (req, res) => {
    try {
        const userId = req.user._id
        const userTasks = await Task.find({ user: userId })
        res.json({
            success: true, 
            userTasks
        }).status(200)
    } catch (error) {
        res.json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        task.isCompleted = !task.isCompleted
        task.save()
        res.json({
            success: true, 
            message: "Updated!"
        })

    }
    catch {
        res.json({
            success: false, 
            message: "Invalid Id"
        })
    }
}

export const delTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        await task.deleteOne()
        res.json({
            success: true, 
            message: "Deleted"
        })
    }
    catch {
        res.json({
            success: false, 
            message: "Invalid Id"
        })
    }
}