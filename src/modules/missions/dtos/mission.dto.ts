export interface MissionCreateRequest {
    title: string;
    description: string;
    store_id: number;
    point: number;
}

export interface UserMissionCreateRequest {
    user_id: number;
    mission_id: number;
}

export const bodyToMission = (body: MissionCreateRequest) => {
    return {
        title: body.title,
        description: body.description,
        storeId: body.store_id,
        point: body.point,
    };
}

export const responseFromMission = (mission: any) => {
    return {
        title: mission.title,
        description: mission.description,
        storeId: mission.store_id,
        missionId: mission.mission_id,
        point: mission.point,
        status: mission.status,
    };
}

export const bodyToUserMission = (body: any) => {
    return {
        userId: body.user_id,
        missionId: body.mission_id,
    };
}

export const responseFromUserMission = (userMission: any) => {
    return {
        userId: userMission.user_id,
        missionId: userMission.mission_id,
        userMissionId: userMission.user_mission_id,
        status: userMission.status,
    };
}

//미션 리스트 응답 (+커서 페이지네이션)
export const responseFromMissions = (missions: any[], page: number, pageSize: number) => {
    const lastMissionId = missions.length > 0 ? missions[missions.length - 1].mission_id : null;
    return {
        data: missions.map(mission => ({
            title: mission.title,
            description: mission.description,
            storeId: mission.store_id,
            missionId: mission.mission_id,
            point: mission.point,
            status: mission.status,
    })),
    pagination: {
        cursor: lastMissionId,
    },
    };
}

//진행 중인 미션 리스트 응답
export const responseFromInProgressMissions = (missions: any[]) => {
    const lastUserMissionId = missions.length > 0 ? missions[missions.length - 1].mission_id : null;
    return {
        data: missions.map(mission => ({
            title: mission.title,
            description: mission.description,
            storeId: mission.store_id,
            userMissionId: mission.user_mission_id,
            missionId: mission.mission_id,
            point: mission.point,
            status: mission.status,
        })),
        pagination: {
            cursor: lastUserMissionId,
        },
    };
};