import { prisma } from "../../../db.config.js";

// 1.미션 추가
export const addMission = async (storeId: number, spec: string, reward: number): Promise<number> => {
  const result = await prisma.mission.create({
    data: {
      storeId: storeId,
      missionSpec: spec,
      reward: reward,
    },
  });
  return result.id;
};

// 2.도전 중인 미션인지 확인
export const isMissionPresent = async (memberId: number, missionId: number): Promise<boolean> => {
  const count = await prisma.memberMission.count({
    where: {
      userId: memberId, // 스키마 필드명이 userId인지 확인하세요
      missionId: missionId,
      status: "CHALLENGING",
    },
  });
  return count > 0;
};

// 3. 미션 도전 등록
export const addMemberMission = async (memberId: number, missionId: number): Promise<number> => {
  const result = await prisma.memberMission.create({
    data: {
      userId: memberId,
      missionId: missionId,
      status: "CHALLENGING",
    },
  });
  return result.id;
};

// 4. 특정 가게의 미션 목록 조회 (미션2)
export const getMissionsByStore = async (storeId: number, cursor?: number) => {
  return await prisma.mission.findMany({
    where: { storeId: storeId },
    take: 10,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: "asc" },
  });
};

// 5. 내가 진행 중인 미션 목록 조회(미션3)
export const getUserInProgressMissions = async (userId: number, cursor?: number) => {
  return await prisma.memberMission.findMany({
    where: {
      userId: userId,
      status: "CHALLENGING",
    },
    include: {
      mission: {
        include: {
          store: { select: { name: true } },
        },
      },
    },
    take: 10,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
  });
};

// 6. 진행 중인 미션을 완료로 변경(미션4)
export const updateMemberMissionStatus = async (memberMissionId: number) => {
  return await prisma.memberMission.update({
    where: { id: memberMissionId },
    data: { status: "COMPLETE" },
  });
};