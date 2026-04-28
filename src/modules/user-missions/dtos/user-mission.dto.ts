// 1. 미션 도전하기 요청 데이터의 설계도를 만듭니다.
export interface StartMissionRequest {
    user_id: number;    // 미션을 도전하는 사용자 ID
    mission_id: number; // 도전할 미션 ID
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 형태로 변환해주는 함수입니다.
export const bodyToUserMission = (body: StartMissionRequest) => {
    return {
        userId: body.user_id,
        missionId: body.mission_id,
    };
};

// 3. 데이터베이스의 도전 미션 정보를 응답 형식으로 변환해주는 함수입니다.
export const responseFromUserMission = (userMission: any) => {
    return {
        userMissionId: userMission.user_mission_id,
        isComplete: userMission.is_complete === 1, // 0/1을 true/false로 변환합니다.
        userId: userMission.user_id,
        missionId: userMission.mission_id2,
    };
};
