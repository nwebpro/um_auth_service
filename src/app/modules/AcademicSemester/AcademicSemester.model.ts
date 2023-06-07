import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './AcademicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './AcademicSemester.constant';
import ApiError from '../../../errors/ApiErrors';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

// Handling Same Year and same semester validation
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    year: this.year,
    title: this.title,
    code: this.code,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic Semester already exist');
  } else {
    next();
  }
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
