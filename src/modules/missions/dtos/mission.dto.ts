export interface MissionCreateRequest {
    title: string;
    description: string;
    store_id: number;
}

export const bodyToMission = (body: MissionCreateRequest) => {
    return {
        title: body.title,
        description: body.description,
        storeId: body.store_id,
    };
}

export const responseFromMission = (mission: any) => {
    return {
        title: mission.title,
        description: mission.description,
        storeId: mission.store_id,
        missionId: mission.mission_id,
    };
}
