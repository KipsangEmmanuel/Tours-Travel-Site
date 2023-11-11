import express, { json, NextFunction, Request, Response, urlencoded } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import user_router from './routes/userRouter';

dotenv.config();

const app = express();


app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }))

app.use("/user", user_router);


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: error.message
    })
})


const port = process.env.PORT || 8500

app.listen(port, () => {
    console.log(`Server up and  running at port: ${port}`);
    
})