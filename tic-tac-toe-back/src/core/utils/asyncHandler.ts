import { NextFunction, Request, Response } from 'express';

type Func = (req: Request, res: Response, next: NextFunction) => Promise<any>
function asyncHandler(fn: Func) {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise
      .resolve(fn(req, res, next))
      .catch(next);
  }
}

export default asyncHandler