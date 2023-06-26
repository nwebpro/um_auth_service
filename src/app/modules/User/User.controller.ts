import { Request, Response } from 'express';
import { UserService } from './User.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

// Create Student
const createStudent = catchAsync(async (req: Request, res: Response) => {
  // Body Response
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

// Create Faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  // Body Response
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

// Create Faculty
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  // Body Response
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdmin(admin, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
