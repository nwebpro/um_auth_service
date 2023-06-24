import { Model } from 'mongoose';

export interface IManagementDepartment {
  title: string;
}

export interface IManagementDepartmentFilters {
  searchTerm?: string;
}

export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;
