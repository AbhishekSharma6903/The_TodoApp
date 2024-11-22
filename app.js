import express from 'express';
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
export const app = express();
import cookieParser from 'cookie-parser';
import { errorMiddleWare } from './middlewares/error.js';
import cors from 'cors';

config({
    path : './data/config.env'
});

//Using middleware
app.use(express.json());
app.use(cookieParser());

//Using routes
app.use('/api/v1/users',userRouter);
app.use('/api/v1/task',taskRouter);
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    Credentials: true,
}))


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(errorMiddleWare);
