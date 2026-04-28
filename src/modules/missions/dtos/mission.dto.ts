// 1. 미션 생성 요청 데이터의 설계도를 만듭니다.
export interface CreateMissionRequest {
    store_id: number;   // 미션을 추가할 가게 ID
    deadline: string;   // 미션 마감일 (예: "2025-12-31")
    conditional: string; // 미션 조건 (예: "30,000원 이상 주문 시")
    point: number;      // 미션 달성 시 지급되는 포인트
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 형태로 변환해주는 함수입니다.
export const bodyToMission = (body: CreateMissionRequest) => {
    return {
        storeId: body.store_id,
        deadline: new Date(body.deadline), // 문자열을 Date 객체로 변환합니다.
        conditional: body.conditional,
        point: body.point,
    };
};

// 3. 데이터베이스의 미션 정보를 응답 형식으로 변환해주는 함수입니다.
export const responseFromMission = (mission: any) => {
    return {
        missionId: mission.mission_id,
        deadline: mission.deadline,
        conditional: mission.conditional,
        point: mission.point,
        createdAt: mission.created_at,
        storeId: mission.store_id,
    };
};
