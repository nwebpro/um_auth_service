import { IAcademicSemester } from '../AcademicSemester/AcademicSemester.interface';
import { User } from './User.model';

/* ==============================
* Get last Student id from database
================================= */
export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
// Generate Student Id
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string | undefined> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  // increment id by 1
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementId}`;
  return incrementId;
};

/* ==============================
* Get last Faculty id from database
================================= */
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};
// Generate Faculty Id
export const generateFacultyId = async (): Promise<string | undefined> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  // increment id by 1
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};

/* ==============================
* Get last Admin id from database
================================= */
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastAdmin?.id ? lastAdmin?.id.substring(2) : undefined;
};
// Generate Admin Id
export const generateAdminId = async (): Promise<string | undefined> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  // increment id by 1
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `A-${incrementId}`;
  return incrementId;
};
