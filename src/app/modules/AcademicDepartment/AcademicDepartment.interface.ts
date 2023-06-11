import { IAcademicFaculty } from './../AcademicFaculty/AcademicFaculty.interface';
import { Model, Types } from 'mongoose';

export interface IAcademicDepartment {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
}

export interface IAcademicDepartmentFilters {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
}

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
