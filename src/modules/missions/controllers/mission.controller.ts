import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission, CreateMissionRequest } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

export const handleCreateMission = async (req: Request, res: Response, next: NextFunction) => {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    try {
        const mission = await createMission(bodyToMission(req.body as CreateMissionRequest));
        res.status(StatusCodes.OK).json({ result: mission });
    } catch (err) {
        // 에러를 다음 미들웨어(에러 핸들러)로 넘깁니다.
        next(err);
    }
};
