import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { shortCode } from './controllers/controller.js';
import Urlroutes from './routes/Urlroutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', Urlroutes);
app.get('/:shortCode', shortCode);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error(err));