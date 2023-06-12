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

export type BloodGroupList =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'O+'
  | 'O-'
  | 'AB+'
  | 'AB-';

export type GenderTypeList = 'male' | 'female';

export interface IStudentFilters {
  searchTerm?: string;
  id?: string;
  bloodGroup?: BloodGroupList;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
}

export interface IStudent {
  id: string | undefined;
  name: UserName;
  gender: GenderTypeList;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: BloodGroupList;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage: string;
}

export type StudentModel = Model<IStudent, Record<string, unknown>>;
