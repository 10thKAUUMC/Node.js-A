// mission.route.ts 예시
import express from "express";
import { handleMissionCreate, handleMissionChallenge } from "./controllers/mission.controller.js";

export const missionRouter = express.Router();

missionRouter.post("/stores/:storeId/missions", handleMissionCreate);
missionRouter.post("/members/:memberId/missions/:missionId", handleMissionChallenge);