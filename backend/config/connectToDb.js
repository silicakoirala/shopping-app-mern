import dotenv from 'dotenv';

// if (process.env.NODE_ENV != "production") {
//   dotenv.config();
// }

import mongoose, { connect } from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }
}

export default connectToDb;