import { bodyToMission, responseFromMission } from "../dtos/mission.dto";
import {
    checkStore,
    addMission,
    getMission,
} from "../repositories/mission.repository";

//가게에 미션 추가
export const createMission = async(data: ReturnType<bodyToMission>) => {
    //가계 존재 여부 확인
    const checkStoreExist = await checkStore(data.store_id);
    if (!checkStoreExist) {
        throw new Error("존재하지 않는 가게입니다.");
    }
    const missionId = await addMission(data);
    
    //mission 반환
    const mission = await getMission(missionId);
    return responseFromMission(mission);
}