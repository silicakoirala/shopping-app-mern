import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDb from './config/connectToDb.js';
import authRoute from './routes/authRoute.js'

//configure env
dotenv.config();

//connect to tb
connectToDb();

//rest object
//import express and declare a variable for it
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/auth', authRoute);

//PORT
app.use(
  cors({
    origin: 'http://localhost:5173', //Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow these headers 
  })
);

//rest api
// Define a route at the root URL ('/') to handle a basic GET request 
// first parameter is string for route, second is a call back function that handles the request
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN stack Ecommerce app');
})



mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('App connected to database');
    // app.listen() in Express is like telling your app to start listening for visitors on a specific address and port, much like how Node listens for connections.
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to post:${process.env.PORT}`);
    });
    // Start the Express server only if the database connection is successful
  })
  .catch((error) => {
    console.log(error);
  });