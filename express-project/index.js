import express from 'express';
import cors from 'cors';
import authRoute from './rouder/authRoute.js';
import databaseConnection from './confic/Database.js';
import cookieParser from 'cookie-parser'
import { Verification } from './midelware/Verification.js';
import productRoute from './rouder/productrouter.js';
import ContactRoute from './rouder/ContactRoute.js';
import cartRoute from './rouder/cartRoute.js';

const app = express();

app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use("/auth", authRoute);
app.use('/verify',Verification,authRoute);
app.use('/product', productRoute);
app.use('/uploads',express.static('uploads'));
app.use('/api', ContactRoute);
app.use('/api',cartRoute)
databaseConnection();

app.listen(8000, () => {
    console.log("Server is listening on port 8000...");
});
