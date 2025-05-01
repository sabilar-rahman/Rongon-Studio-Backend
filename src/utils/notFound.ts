// import { NextFunction, Request, Response } from 'express';

// const notFound = (req: Request, res: Response, next: NextFunction) => {
//   return res.status(404).json({
//     success: false,
//     message: 'API Not Found !!',
//     error: '',
//   });
// };

// export default notFound;

import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
export const notFound=((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "API NOT FOUND!",
      error: {
          path: req.originalUrl,
          message: "Your requested path is not found!"
      }
  })
})
