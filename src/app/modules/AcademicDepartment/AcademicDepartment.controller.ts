import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './AcademicDepartment.interface';
import httpStatus from 'http-status';
import { AcademicDepartmentService } from './AcademicDepartment.service';

// Create Academic Department
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  // Body Response
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
};
