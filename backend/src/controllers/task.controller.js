const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res, next) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Task title is required",
            });
        }

        const task = await Task.create({
            title,
            description: description || "",
            priority: priority || "Medium",
            status: status || "Pending",
            dueDate: dueDate || null,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            task: task,
        });
    } catch (err) {
        next(err);
    }
};

// GET ALL TASKS
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            tasks: tasks,
        });
    } catch (err) {
        next(err);
    }
};

// UPDATE TASK
exports.updateTask = async (req, res, next) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            {
                title,
                description,
                priority,
                status,
                dueDate,
            },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            task: task,
        });
    } catch (err) {
        next(err);
    }
};

// DELETE TASK
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};
