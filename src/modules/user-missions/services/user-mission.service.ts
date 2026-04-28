import { bodyToUserMission, responseFromUserMission } from "../dtos/user-mission.dto.js";
import {
    getInProgressMission,
    addUserMission,
    getUserMissionById,
} from "../repositories/user-mission.repository.js";

export const startMission = async (data: ReturnType<typeof bodyToUserMission>) => {
    // 이미 도전 중인 미션인지 먼저 확인합니다.
    const existing = await getInProgressMission(data.userId, data.missionId);
    if (existing) {
        throw new Error("이미 도전 중인 미션입니다.");
    }

    // 도전 기록을 저장하고 생성된 ID를 받아옵니다.
    const userMissionId = await addUserMission(data);

    // 저장된 도전 기록을 다시 조회해서 응답 형식으로 반환합니다.
    const userMission = await getUserMissionById(userMissionId);
    return responseFromUserMission(userMission);
};
