import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import ApiError from "../../errors/AppError";
import httpStatus from "http-status"
import AppError from "../../errors/AppError";

export const createStudentController = catchAsync(async (req, res) => {
  const data = req.body;
  const student = await prisma.student.create({
    data,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Student created successfully",
    data: student,
  });
});

// get all student

export const getAllStudentsController = catchAsync(async (req, res) => {
  const students = await prisma.student.findMany();

  if (students.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Students not found");
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Students fetched successfully",
    data: students,
  });
});

// get by id

export const getStudentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const student = await prisma.student.findUnique({
    where: { id },
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student fetched successfully",
    data: student,
  });
});


export const updateStudentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  

  // Check if the vacation exists
  const existingStudent = await prisma.student.findUnique({
    where: { id },
  });

  // if (!existingStudent) {
  //    sendResponse(res, {
  //     statusCode: 404,
  //     success: false,
  //     message: "Student not found",
  //   });
  // }

  if (!existingStudent) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  const student = await prisma.student.update({
    where: { id },
    data: updateData,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});



export const deleteStudentByIdController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
    }

   const result = await prisma.student.delete({
      where: { id },
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  }
);