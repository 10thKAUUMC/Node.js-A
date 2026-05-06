import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createReview } from "../services/review.service";
import { bodyToReview } from "../dtos/review.dto";
import { ReviewCreateRequest } from "../dtos/review.dto";

export const handleCreateReview = async (req: Request, res: Response) => {
    console.log("리뷰 생성을 요청했습니다!");
    console.log("body:", req.body);
    try {
        const review = await createReview(bodyToReview(req.body as ReviewCreateRequest));

        res.status(StatusCodes.OK).json({ result: "리뷰 생성 성공!" });
    } catch (e) {
        console.error("리뷰 생성 에러 발생:", e);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            isSuccess: false,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: e instanceof Error ? e.message : "리뷰 생성 실패",
        });
    } finally{
            console.log("리뷰 생성 요청 처리 완료.");
    }
}
