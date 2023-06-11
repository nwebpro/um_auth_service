import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './AcademicDepartment.interface';
import httpStatus from 'http-status';
import { AcademicDepartmentService } from './AcademicDepartment.service';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './AcademicDepartment.constant';
import { paginationFields } from '../../../constants/pagination';

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

// Get All Departments
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
};
