import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as storeService from "../services/store.service.js";

// 1. 가게 리뷰 목록 조회 핸들러
export const handleListStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 'as string'을 붙여서 undefined 에러(ts2345)를 해결합니다.
    const storeId = parseInt(req.params.storeId as string, 10);
    const cursor =
      typeof req.query.cursor === "string"
        ? parseInt(req.query.cursor, 10)
        : 0;

    // 서비스/리포지토리 구조에서 인자를 객체로 받는지 확인이 필요합니다.
    // 'Expected 1 arguments, but got 2' 에러가 나면 아래처럼 { }로 감싸주세요.
    const reviews = await storeService.listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

// 2. 가게 생성 핸들러
export const handleStoreCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const regionId = req.params.regionId as string; // ts2345 에러 해결
    const result = await storeService.createStore(parseInt(regionId, 10), req.body.name);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};

// 3. 리뷰 생성 핸들러
export const handleReviewCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = req.params.storeId as string; // ts2345 에러 해결
    const result = await storeService.createReview(parseInt(storeId, 10), req.body);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};