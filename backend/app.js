import express from 'express';
import morgan from 'morgan';
import connectdb  from './db/db.js';
import userRoutes from './Routes/userRoutes.js';
import aiRoutes from './Routes/aiRoutes.js';
import projectRoutes from './Routes/projectRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
connectdb();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use("/ai", aiRoutes)



app.get('/', (req, res) => {
  res.send('Hello World');
});  

export default app;
