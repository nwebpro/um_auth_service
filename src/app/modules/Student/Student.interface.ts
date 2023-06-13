import { Model, Types } from 'mongoose';
import { IAcademicSemester } from '../AcademicSemester/AcademicSemester.interface';
import { IAcademicDepartment } from '../AcademicDepartment/AcademicDepartment.interface';
import { IAcademicFaculty } from '../AcademicFaculty/AcademicFaculty.interface';

export interface UserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
}

export interface LocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface IStudentFilters {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
}

export interface IStudent {
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
  guardian: Guardian; // embedded object
  localGuardian: LocalGuardian; // embedded object
  academicSemester: Types.ObjectId | IAcademicSemester; // reference field
  academicDepartment: Types.ObjectId | IAcademicDepartment; // reference field
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference field
  profileImage: string;
}

export type StudentModel = Model<IStudent, Record<string, unknown>>;
