import { bodyToMission, responseFromMission } from "../dtos/mission.dto.js";
import {
    getStoreById,
    addMission,
    getMissionById,
} from "../repositories/mission.repository.js";

export const createMission = async (data: ReturnType<typeof bodyToMission>) => {
    // 미션을 추가하려는 가게가 존재하는지 먼저 확인합니다.
    const store = await getStoreById(data.storeId);
    if (!store) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    // 미션을 저장하고 생성된 ID를 받아옵니다.
    const missionId = await addMission(data);

    // 저장된 미션을 다시 조회해서 응답 형식으로 반환합니다.
    const mission = await getMissionById(missionId);
    return responseFromMission(mission);
};
