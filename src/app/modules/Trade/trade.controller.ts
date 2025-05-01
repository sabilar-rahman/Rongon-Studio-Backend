import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import ApiError from "../../errors/AppError";
import httpStatus from "http-status"
import AppError from "../../errors/AppError";

export const createTradeController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await prisma.trade.create({
    data,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Trade created successfully",
    data: result,
  });
});

// get all Trade

export const getAllTradesController = catchAsync(async (req, res) => {
  const result = await prisma.trade.findMany();

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Trade not found");
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Trade fetched successfully",
    data: result,
  });
});

// get by id

export const getTradeByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const Trade = await prisma.trade.findUnique({
    where: { id },
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Trade fetched successfully",
    data: Trade,
  });
});


export const updateTradeByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  

  // Check if the vacation exists
  const existingTrade = await prisma.trade.findUnique({
    where: { id },
  });

  // if (!existingTrade) {
  //    sendResponse(res, {
  //     statusCode: 404,
  //     success: false,
  //     message: "Trade not found",
  //   });
  // }

  if (!existingTrade) {
    throw new AppError(httpStatus.NOT_FOUND, "Trade not found");
  }

  const Trade = await prisma.trade.update({
    where: { id },
    data: updateData,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Trade updated successfully",
    data: Trade,
  });
});



export const deleteTradeByIdController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const existingTrade = await prisma.trade.findUnique({
      where: { id },
    });

    if (!existingTrade) {
      throw new ApiError(httpStatus.NOT_FOUND, "Trade not found");
    }

   const result = await prisma.trade.delete({
      where: { id },
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Trade deleted successfully',
      data: result,
    });
  }
);