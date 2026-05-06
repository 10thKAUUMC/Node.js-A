import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service";

export const handleListStoreReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const storeId = parseInt(req.params.storeId as string, 10);
      const cursor =
      typeof req.query.cursor === "string"
        ? parseInt(req.query.cursor, 10)
        : 0;
  
      const reviews = await listStoreReviews(storeId, cursor);
  
      res.status(StatusCodes.OK).json(reviews);
    } catch (err) {
      next(err);
    }
  };