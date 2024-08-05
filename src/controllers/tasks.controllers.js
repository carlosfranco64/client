const Task = require("../models/task.models.js");
// const bcrypt = require("bcryptjs");
// const createAccessToken = require("../libs/jwt.js");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");
    // console.log({user:req.user.id})
    res.json(tasks);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, date, status } = req.body;
    const nweTask = new Task({
      title,
      description,
      date,
      status,
      user: req.user.id,
    });

    const savedTask = await nweTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

const getTask = async (req, res) => {
  try {
    const taskFound = await Task.findById(req.params.id).populate("user");

    if (!taskFound) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(taskFound);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskFound = await Task.findByIdAndDelete(req.params.id);

    if (!taskFound) return res.status(404).json({ message: "Task not found" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!taskFound) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(taskFound);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};



const tasksStarted = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      statusTask: false
    }).populate("user");

    if (tasks) return res.status(404).json({ message: "No tasks found" });

    res.status(200).json(tasks);
    
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  getTask,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  tasksStarted,
};
