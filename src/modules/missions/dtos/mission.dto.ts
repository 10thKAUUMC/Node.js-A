export interface MissionCreateRequest {
    title: string;
    description: string;
    store_id: number;
    point: number;
}

export interface MissionCreateResponse {
    title: string;
    description: string;
    storeId: number;
    missionId: number;
    point: number;
    deadline: Date | null;
}

export interface InProgressMissionResponse {
    userMissionId: number;
    missionId: number;
    status: string;
    createdAt: Date;
    title: string;
    description: string;
    point: number;
    storeId: number;
}

export interface InProgressMissionListResponse {
    data: InProgressMissionResponse[];
    pagination: {
        cursor: number | null;
    };
}

export interface UserMissionCreateRequest {
    userId: number;
    missionId: number;
}

export interface UserMissionCreateResponse {
    userId: number;
    missionId: number;
    userMissionId: number;
    status: string;
}

export const bodyToMission = (body: MissionCreateRequest) => {
    return {
        title: body.title,
        description: body.description,
        storeId: body.store_id,
        point: body.point,
    };
}

export const responseFromMission = (mission: any): MissionCreateResponse => {
    return {
        title: mission.title,
        description: mission.description,
        storeId: mission.storeId,
        missionId: mission.id,
        point: mission.point,
        deadline: mission.deadline,
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
        userId: userMission.userId,
        missionId: userMission.missionId,
        userMissionId: userMission.id,
        status: userMission.status,
    };
}

//미션 리스트 응답 (+커서 페이지네이션)
export const responseFromMissions = (missions: any[]) => {
    const lastMissionId = missions.length > 0 ? missions[missions.length - 1].id : null;
    return {
        data: missions.map(mission => ({
            title: mission.title,
            description: mission.description,
            storeId: mission.storeId,
            missionId: mission.id,
            point: mission.point,
            deadline: mission.deadline,
    })),
    pagination: {
        cursor: lastMissionId,
    },
    };
}

//진행 중인 미션 리스트 응답
export const responseFromInProgressMissions = (userMissions: any[]): InProgressMissionListResponse => {
    const lastUserMissionId = userMissions.length > 0 ? userMissions[userMissions.length - 1].id : null;
    return {
        data: userMissions.map(um => ({
            userMissionId: um.id,
            missionId: um.missionId,
            status: um.status,
            createdAt: um.createdAt,
            // include: { mission: true } 로 가져온 데이터 매핑
            title: um.mission?.title,
            description: um.mission?.description,
            point: um.mission?.point,
            storeId: um.mission?.storeId,
        })),
        pagination: {
            cursor: lastUserMissionId,
        },
    };
};

