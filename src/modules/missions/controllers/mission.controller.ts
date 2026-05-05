import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as missionService from "../services/mission.service.js";

export const handleMissionCreate = async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const result = await missionService.createMission(Number(storeId), req.body.missionSpec, req.body.reward);
  res.status(StatusCodes.OK).json({ result });
};

export const handleMissionChallenge = async (req: Request, res: Response) => {
  const { memberId, missionId } = req.params;
  const result = await missionService.challengeMission(Number(memberId), Number(missionId));
  res.status(StatusCodes.OK).json({ result });
};