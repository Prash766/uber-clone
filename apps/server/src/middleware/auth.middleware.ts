import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/ApiError";

const verifyUserJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies["auth-token"] ||
      (req.headers["Authorization"] as string)?.split("=")[1];
    if (!token) throw new ApiError("Unauthorized", 400);
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    console.log(decodedToken);
    req.user = {
      id: decodedToken.id,
    };
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};

const verifyCaptainJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies["auth-token"] ||
      (req.headers["Authorization"] as string)?.split("=")[1];
    if (!token) throw new ApiError("Unauthorized", 400);
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.captain = decodedToken.id;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};
export { verifyUserJWT, verifyCaptainJWT };
