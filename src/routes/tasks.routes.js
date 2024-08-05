const router=require('express').Router()

const {
    getTasks, 
    getTask, 
    createTask, 
    deleteTask, 
    updateTask,
    tasksStarted
}=require("../controllers/tasks.controllers")

const { authRequired } = require('../middleware/validateToken')
const validateSchema = require('../middleware/validator.middleware')
const createTaskSchema = require('../schemas/task.schema')





router.get('/tasks',authRequired,getTasks)
router.get('/tasks/:id',authRequired,getTask)
router.post('/tasks',authRequired,validateSchema(createTaskSchema),createTask)
router.delete('/tasks/:id',authRequired,deleteTask)
router.put('/tasks/:id',authRequired,updateTask)
router.get('/tasks/stated',authRequired,tasksStarted)
  

module.exports=router  
