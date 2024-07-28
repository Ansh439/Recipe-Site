import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongoose connected!");
    })
    .catch((error) => {
        console.log(error);
    })

const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server started running on ${PORT}`)
})


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

