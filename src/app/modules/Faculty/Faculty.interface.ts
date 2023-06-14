import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../AcademicDepartment/AcademicDepartment.interface';
import { IAcademicFaculty } from '../AcademicFaculty/AcademicFaculty.interface';

export interface UserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface IFacultyFilters {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
}

export interface IFaculty {
  id: string | undefined;
  name: UserName; // embedded object
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment; // reference field
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference field
  profileImage: string;
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
