import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../utils/sendResponse';

const isValidObjectId = (id: string): boolean => /^[a-f\d]{24}$/i.test(id);

const validateObjectId =
  (paramName: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    if (!isValidObjectId(id)) {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: `Invalid ${paramName} format`,
      });
      return;
    }
    next();
  };

export default validateObjectId;

