import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './Faculty.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './Faculty.constant';
import { paginationFields } from '../../../constants/pagination';
import { FacultyService } from './Faculty.service';

// Get All Faculties
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOption = pick(req.query, paginationFields);
  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOption
  );
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Get Single Faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty fetched successfully',
    data: result,
  });
});

// Update Faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated Faculty successfully',
    data: result,
  });
});

// Delete faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Faculty successfully',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
