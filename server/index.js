import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import route from './routes/userRoute.js';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 7000;
// eslint-disable-next-line no-undef
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(()=>{
        console.log("DB connected successfully.")
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err)=>{
        console.error("DB connection failed:", err);
    });

    app.use('/api', route);
