import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview, CreateReviewRequest } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";

export const handleCreateReview = async (req: Request, res: Response, next: NextFunction) => {
    console.log("리뷰 작성을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    try {
        const review = await createReview(bodyToReview(req.body as CreateReviewRequest));
        res.status(StatusCodes.OK).json({ result: review });
    } catch (err) {
        // 에러를 다음 미들웨어(에러 핸들러)로 넘깁니다.
        next(err);
    }
};
