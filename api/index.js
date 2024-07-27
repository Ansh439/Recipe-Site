import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongoose connected!");
    })
    .catch((error) => {
        console.log(error);
    })

const PORT = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.send("Hello Project")
})

app.listen(PORT, () => {
    console.log(`Server started running on ${PORT}`)
})


app.use('/api/user', userRoutes);




