import * as missionRepo from "../repositories/mission.repository.js";

export const createMission = async (storeId: number, spec: string, reward: number) => {
  const missionId = await missionRepo.addMission(storeId, spec, reward);
  return { id: missionId, storeId, spec, reward };
};

export const challengeMission = async (memberId: number, missionId: number) => {
  const isChallenging = await missionRepo.isMissionPresent(memberId, missionId);
  if (isChallenging) throw new Error("이미 도전 중인 미션입니다.");
  
  const id = await missionRepo.addMemberMission(memberId, missionId);
  return { memberMissionId: id, status: "CHALLENGING" };
};