import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../ManagementDepartment/ManagementDepartment.interface';

export interface UserName {
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface IAdminFilters {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment?: string;
  designation?: string;
}

export interface IAdmin {
  id: string | undefined;
  name: UserName; // embedded object
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'male' | 'female';
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment: Types.ObjectId | IManagementDepartment; // reference field
  designation: string;
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
