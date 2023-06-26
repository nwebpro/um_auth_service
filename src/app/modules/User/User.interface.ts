import { Model, Types } from 'mongoose';
import { IStudent } from '../Student/Student.interface';
import { IFaculty } from '../Faculty/Faculty.interface';
import { IAdmin } from '../Admin/Admin.interface';

export interface IUser {
  id: string | undefined;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
