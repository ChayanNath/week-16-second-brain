import { RequestHandler } from "express";
import { User } from "../models/UserSchema";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Signup function with validation and password hashing
export const signup: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { username, password } = signupSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const signin: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { username, password } = signupSchema.parse(req.body);

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "thisisasecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
