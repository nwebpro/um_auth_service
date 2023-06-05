import { Request, Response, NextFunction } from "express";
import UsersService from "./Users.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    const result = await UsersService.createUser(user);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
};
