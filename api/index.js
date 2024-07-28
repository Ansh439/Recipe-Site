import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import cookieParser from 'cookie-parser';
import path from 'path'

dotenv.config();

const __dirname = path.resolve();
const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongoose connected!");
    })
    .catch((error) => {
        console.log(error);
    })

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server started running on ${PORT}`)
})


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

