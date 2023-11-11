import express, { NextFunction, Request, Response, urlencoded } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }))


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: error.message
    })
})


const port = process.env.PORT || 8500

app.listen(port, () => {
    console.log(`Server up and  running at port: ${port}`);
    
})