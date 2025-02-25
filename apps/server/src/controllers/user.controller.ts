import asyncHandler from "../utils/asyncHandler";
import { prisma } from "@repo/db";
import {
  comparePassword,
  generateAuthToken,
  hashPassword,
} from "../utils/helper";
import { Prisma } from "@prisma/client";
import ApiError from "../utils/ApiError";

export const userDetails = Prisma.validator<Prisma.UserSelect>()({
  firstName: true,
  lastName: true,
  socketId: true,
  email: true,
  createdAt: true,
  id: true,
});

export const tokenOptions = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  maxAge: 1 * 24 * 60 * 60 * 1000,
};

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new ApiError("Invalid Credentials", 400);
    const isMatched = comparePassword(password, user.password);
    if (!isMatched) throw new ApiError("Invalid Credentials", 400);
    const token = generateAuthToken({
      id: user.id,
    });
    const { password: _, ...filteredUser } = user;
    res.cookie("auth-token", token, tokenOptions);
    return res.status(200).json({
      success: true,
      message: "User Logged in",
      user: filteredUser,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const signUpUser = asyncHandler(async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      },
      select: userDetails,
    });
    const token = generateAuthToken({ id: user.id });
    res.cookie("auth-token", token, tokenOptions);
    return res.status(200).json({
      success: true,
      message: "User created Successfully",
      user,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already in use." });
    } else {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("auth-token", "");
    return res.status(200).json({
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      },
      select: userDetails,
    });
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: "Internal Server Error",
    });
  }
});

const verifyUser = asyncHandler(async(req , res)=>{
  return res.status(200).json({
    success:true,
    message:"Authenticated"
  })
})

export { loginUser, signUpUser, getUserProfile, logOutUser, verifyUser };
