import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createReview } from "../sevices/review.service";
import { bodyToReview } from "../dtos/review.dto";
import { ReviewCreateRequest } from "../dtos/review.dto";

export const handleCreateReview = async (req: Request, res: Response) => {
    console.log("리뷰 생성을 요청했습니다!");
    console.log("body:", req.body);
    
    const review = await createReview(bodyToReview(req.body as ReviewCreateRequest));

    res.status(StatusCodes.OK).json({ result: "리뷰 생성 성공!" });
}