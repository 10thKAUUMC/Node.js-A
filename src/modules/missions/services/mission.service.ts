import { 
    bodyToMission,
    responseFromMission,
    responseFromInProgressMissions,
    responseFromMissions,
    responseFromUserMission,

 } from "../dtos/mission.dto";
import {
    checkStore,
    addMission,
    getMission,
    checkUserMissionstatus,
    getUserMission,
    getInProgressMissions,
    adduserMission,
    updateUserMissionStatus,
} from "../repositories/mission.repository";
import { StoreNotFoundError, MissionAlreadyInProgressError } from "../../../common/errors/error";

//가게에 미션 추가
export const createMission = async(data: ReturnType<typeof bodyToMission>) => {
    //가계 존재 여부 확인
    const checkStoreExist = await checkStore(data.storeId);
    if (!checkStoreExist) {
        throw new StoreNotFoundError("존재하지 않는 가게입니다.");
    }
    const missionId = await addMission(data);
    
    //mission 반환
    const mission = await getMission(missionId);
    return responseFromMission(mission);
}

export const listMyInProgressMissions = async (userId: number, cursor?: number) => {
    const pageSize = 10;
    const missions = await getInProgressMissions(userId, cursor || null, pageSize);
    return responseFromInProgressMissions(missions);
};

export const createUserMission = async (userId: number, missionId: number) => {
    const isAlreadyInProgress = await checkUserMissionstatus(userId, missionId);
    if (isAlreadyInProgress) {
        throw new MissionAlreadyInProgressError("이미 진행 중인 미션입니다.");
    }

    const userMissionId = await adduserMission({ userId, missionId });
    const userMission = await getUserMission(userMissionId);
    return responseFromUserMission(userMission);
};

export const processMissionCompletion = async (userMissionId: number) => {
    // 상태 변경
    const updated = await updateUserMissionStatus(userMissionId, "completed");
    
    return responseFromUserMission(updated);
};