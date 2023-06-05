import { RequestHandler } from 'express';
import { UserService } from './User.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // Body Response
    const { user } = req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
