/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IFaculty, IFacultyFilters } from './Faculty.interface';
import { facultySearchableFields } from './Faculty.constant';
import { Faculty } from './Faculty.model';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

// Get All Faculties
const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: facultySearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  //   Exact Match Filter
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Faculty.find(whereCondition)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Faculty
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment');
  return result;
};

// Update Faculty
const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty does not exist');
  }

  const { name, ...facultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  // Dynamically Handle embedded object Name field
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });
  return result;
};

// Delete Faculty
const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id)
    .populate('academicFaculty')
    .populate('academicDepartment');
  return result;
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
