import { Model } from 'mongoose';

export interface IAcademicFaculty {
  title: string;
}
export interface IAcademicFacultyFilters {
  searchTerm?: string;
}
export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
