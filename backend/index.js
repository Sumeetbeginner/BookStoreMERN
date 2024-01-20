
import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();
app.use(express.json())

//Allow all Origins
app.use(cors())

//Allow Custom Origins
// app.use(cors({
//     origin:'http://localhost:3000',
//     methor: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeader : ['Content-Type'],
// }))

app.get('/', (req, res)=>{
   return res.status(234).send('Welcome to Book Store')
})

app.use('/books', booksRoute)

mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App Connected to Database");
    app.listen(PORT, ()=>{
        console.log(`PORT is running on Server ${PORT}`);
    })
})
.catch((err) =>{
    console.log(err);
})
