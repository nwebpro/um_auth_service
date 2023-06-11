import { IAcademicDepartment } from './AcademicDepartment.interface';
import { AcademicDepartment } from './AcademicDepartment.model';

// Create Academic Faculty
const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
};
