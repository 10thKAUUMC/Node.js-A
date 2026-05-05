import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as storeService from "../services/store.service.js";

export const handleStoreCreate = async (req: Request, res: Response) => {
  const { regionId } = req.params;
  const result = await storeService.createStore(Number(regionId), req.body.name);
  res.status(StatusCodes.OK).json({ result });
};

export const handleReviewCreate = async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const result = await storeService.createReview(Number(storeId), req.body);
  res.status(StatusCodes.OK).json({ result });
};