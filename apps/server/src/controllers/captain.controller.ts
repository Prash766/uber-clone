import { prisma } from "@repo/db";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import {
  comparePassword,
  generateAuthToken,
  hashPassword,
} from "../utils/helper";
import { tokenOptions } from "./user.controller";
import { Prisma } from "@prisma/client";

export const captainDetails = Prisma.validator<Prisma.CaptainSelect>()({
  email: true,
  fullName: true,
  id: true,
  createdAt: true,
  updatedAt: true,
  trip: true,
  socketId: true,
  vehicle: true,
});

const loginCaptain = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const captain = await prisma.captain.findUnique({
      where: {
        email,
      },
    });
    if (!captain) throw new ApiError("Invalid Credentials", 400);
    const isMatched = comparePassword(password, captain.password);
    if (!isMatched) throw new ApiError("Invalid Credentials", 400);
    const token = generateAuthToken({
      id: captain.id,
    });
    const { password: _, ...filteredCaptains } = captain;
    res.cookie("auth-token", token, tokenOptions);
    return res.status(200).json({
      success: true,
      message: "Captain Logged in",
      captain: filteredCaptains,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
});

const signUpCaptain = asyncHandler(async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const captain = await prisma.captain.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        onboarding: "pending",
      },
      select: captainDetails,
    });
    const token = generateAuthToken({ id: captain.id });
    res.cookie("auth-token", token, tokenOptions);
    return res.status(200).json({
      success: true,
      message: "Captain created Successfully",
      captain,
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

const completeProfileCaptain = asyncHandler(async (req, res) => {
  try {
    const { vehicleType, color, vehicleNumber } = req.body;
    const [captain, vehicle] = await Promise.all([
      await prisma.captain.update({
        where: {
          id: req.user.id,
        },
        data: {
          onboarding: "completed",
        },
        select: captainDetails,
      }),
      await prisma.vehicle.create({
        data: {
          color,
          vehicleNumber,
          vehicleType,
          captainId: req.user.id,
        },
      }),
    ]);
    res.status(200).json({
      success: true,
      message: "Profile Completed",
      captain,
      vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

const logOutCaptain = asyncHandler(async (req, res) => {
  try {
    res.cookie("auth-token", "");
    return res.status(200).json({
      message: "Captain Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export { loginCaptain, signUpCaptain, completeProfileCaptain, logOutCaptain };
