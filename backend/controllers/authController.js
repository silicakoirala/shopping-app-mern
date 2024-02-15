import userModel from '../models/user.js';
import { hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name) {
      return res.json({ error: 'Name is required.' });
    }
    if (!email) {
      return res.json({ error: 'Email is required.' });
    }
    if (!password) {
      return res.json({ error: 'Password is required.' });
    }
    if (!phone) {
      return res.json({ error: 'Phone is required.' });
    }
    if (!address) {
      return res.json({ error: 'Address is required.' });
    }

    const existingUser = await userModel.findOne({ email })
    //existing user
    if (existingUser) {
      return res.status(200)
        .json({
          success: false,
          message: "Email is already registered. Please login.",
        })
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save 
    const user =  await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: 'User registered successfully.',
      user,
    })
  }
  catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      success: false,
      message: "Error in registration",
      error,
    })
  }
};

