import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUserMission, StartMissionRequest } from "../dtos/user-mission.dto.js";
import { startMission } from "../services/user-mission.service.js";

export const handleStartMission = async (req: Request, res: Response, next: NextFunction) => {
    console.log("미션 도전을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    try {
        const userMission = await startMission(bodyToUserMission(req.body as StartMissionRequest));
        res.status(StatusCodes.OK).json({ result: userMission });
    } catch (err) {
        // 에러를 다음 미들웨어(에러 핸들러)로 넘깁니다.
        next(err);
    }
};
