import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './AcademicFaculty.interface';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './AcademicFaculty.service';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './AcademicFaculty.constants';
import { paginationFields } from '../../../constants/pagination';

// Create Academic Faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  // Body Response
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

// Get All Faculties
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOption = pick(req.query, paginationFields);
  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOption
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Get Single faculties
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Single Faculty fetched successfully',
    data: result,
  });
});

// Update Academic Faculty
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id,
      updatedData
    );
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Updated successfully',
      data: result,
    });
  }
);

// Delete Academic Faculty
const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteAcademicFaculty(id);
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deleted Academic Faculty successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
