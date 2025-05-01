import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import ApiError from "../../errors/AppError";
import httpStatus from "http-status"
import AppError from "../../errors/AppError";

export const createBatchController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await prisma.batch.create({
    data,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Batch created successfully",
    data: result,
  });
});

// get all Batch

export const getAllBatchController = catchAsync(async (req, res) => {
  const result = await prisma.batch.findMany();

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Batch fetched successfully",
    data: result,
  });
});

// get by id

export const getBatchByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const Batch = await prisma.batch.findUnique({
    where: { id },
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Batch fetched successfully",
    data: Batch,
  });
});


export const updateBatchByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  

  // Check if the vacation exists
  const existingBatch = await prisma.batch.findUnique({
    where: { id },
  });

  // if (!existingBatch) {
  //    sendResponse(res, {
  //     statusCode: 404,
  //     success: false,
  //     message: "Batch not found",
  //   });
  // }

  if (!existingBatch) {
    throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
  }

  const Batch = await prisma.batch.update({
    where: { id },
    data: updateData,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Batch updated successfully",
    data: Batch,
  });
});



export const deleteBatchByIdController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const existingBatch = await prisma.batch.findUnique({
      where: { id },
    });

    if (!existingBatch) {
      throw new ApiError(httpStatus.NOT_FOUND, "Batch not found");
    }

   const result = await prisma.batch.delete({
      where: { id },
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Batch deleted successfully',
      data: result,
    });
  }
);