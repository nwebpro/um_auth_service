import { generateFacultyId, generateStudentId } from './User.utils';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiErrors';
import { AcademicSemester } from '../AcademicSemester/AcademicSemester.model';
import { IStudent } from '../Student/Student.interface';
import { IUser } from './User.interface';
import { User } from './User.model';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Student } from '../Student/Student.model';
import { IFaculty } from '../Faculty/Faculty.interface';
import { Faculty } from '../Faculty/Faculty.model';

// Create Student
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string; // default password set in .env file
  }

  // define student role
  user.role = 'student';

  //  Get Academic Semester data
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;

  //   start session
  const session = await mongoose.startSession();
  try {
    // Start Transaction
    session.startTransaction();
    //  Generate Student ID
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    //  Create Student
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Field to create student');
    }
    // set student _id into user.student
    user.student = newStudent[0]._id;
    // Create User
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Field to create user');
    }
    newUserAllData = newUser[0];
    // Commit Transaction
    await session.commitTransaction();
    // End Session
    await session.endSession();
  } catch (error) {
    // Rollback Transaction / Abort Transaction
    await session.abortTransaction();
    // End Session
    await session.endSession();
    throw error;
  }

  //   populate student data with reference field
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};

// Create Faculty
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string; // default password set in .env file
  }

  // define student role
  user.role = 'faculty';

  let newUserAllData = null;

  //   start session
  const session = await mongoose.startSession();
  try {
    // Start Transaction
    session.startTransaction();
    //  Generate Faculty ID
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    //  Create Faculty
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Field to create faculty');
    }
    // set student _id into user.student
    user.faculty = newFaculty[0]._id;
    // Create User
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Field to create user');
    }
    newUserAllData = newUser[0];
    // Commit Transaction
    await session.commitTransaction();
    // End Session
    await session.endSession();
  } catch (error) {
    // Rollback Transaction / Abort Transaction
    await session.abortTransaction();
    // End Session
    await session.endSession();
    throw error;
  }

  //   populate Faculty data with reference field
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
};
