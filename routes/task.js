import express from 'express';
import { newTask, getMyTask, UpdateTask, DeleteTask } from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';



const route = express.Router();

route.post("/new",isAuthenticated, newTask);
route.get("/my",isAuthenticated, getMyTask);

route
    .route("/:id")
    .put(isAuthenticated, UpdateTask)
    .delete(isAuthenticated, DeleteTask);


export default route;