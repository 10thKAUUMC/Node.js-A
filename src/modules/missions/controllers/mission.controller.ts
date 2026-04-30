import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission, MissionCreateRequest } from "../dtos/mission.dto";
import { createMission } from "../sevices/mission.service";

export const handleCreateMission = async (req: Request, res: Response, next: NextFunction) => {
    console.log("미션 생성을 요청했습니다!");
    console.log("body:", req.body);
    
    const mission = await createMission(bodyToMission(req.body as MissionCreateRequest));

    res.status(StatusCodes.OK).json({ result: mission });
}