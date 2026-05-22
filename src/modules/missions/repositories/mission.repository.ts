import { prisma } from "../../../db.config";
import { InternalServerError } from "../../../common/errors/error"

//mission을 넣을 가게 존재 여부
export const checkStore = async(storeId: number): Promise<boolean> => {
        const count = await prisma.store.count( //rows를 쓰는 이유? : // 구조 분해 할당을 사용 -> const [rows, fields] = await conn.query(...); (선호사항)
            {
                where: {
                    id: storeId,
                },
            }
        );
        //가게 존재
        return count > 0;
}

//mission 데이터 삽입
export const addMission = async (data: {
    title: string;
    description: string;
    storeId: number;
    point: number;
}): Promise<any> => {
    try {
        const mission = await prisma.mission.create(
            {
                data: {
                    title: data.title,
                    description: data.description,
                    point: data.point,
                    storeId: data.storeId, // 인터페이스의 store_id를 스키마의 storeId로 매핑
                    deadline: new Date()
                },
            }
        );
        return mission.id;
    }catch (e) {
        console.error("미션 추가 중 오류 발생:", e);
        throw e;
    }
}

//mission 조회
export const getMission = async (missionId: any) => {
    const mission = await prisma.mission.findUnique(
        {
            where: {
                id: missionId,
            },
        }
    )
    if (!mission) return null;
    return mission;
}

//usermission 상태 조회
export const checkUserMissionstatus = async (userId: number, missionId: number) => {
    const count = await prisma.userMission.count(
        {
            where: {
                userId: userId,
                missionId: missionId,
                status: "in_progress",
            },
        }
    )
    return count > 0;

}

//usermission 데이터 삽입
export const adduserMission = async (data: 
    {
    userId: number;
    missionId: number;
    }): Promise<number> => {
    try {
        const create = await prisma.userMission.create(
            {
                data: {
                    userId: data.userId,
                    missionId: data.missionId,
                    status: "in_progress",
                }
            }
        )
        return create.id;
    } catch(e) {
        throw new InternalServerError(`미션 삽입 오류: ${e}`);
    }
}

//userMission 조회
export const getUserMission = async (userMissionId: any) => {
    const userMission = await prisma.userMission.findUnique(
        {
            where: {
                id: userMissionId,
            },
        }
    )
    if (!userMission) return null;
    return userMission;
}

//진행 중 mission 목록 조회
export const getInProgressMissions = async (userId: number, cursor: number | null, pageSize: number) => {
    const userMissions = await prisma.userMission.findMany(
        {
            where: {
                userId: userId,
                status: "in_progress",
            },
            include: {
                mission: true,
            },
            orderBy: {
                id: "asc",
            },
            cursor: cursor ? { id: cursor } : undefined,
            take: pageSize,
        }
    );
    return userMissions;
}

//user mission status 업데이트
export const updateUserMissionStatus = async (userMissionId: number, status: string) => {
    try {
        const updated = await prisma.userMission.update(
            {
                where: {
                    id: userMissionId,
                },
                data: {
                    status: "completed",
                },
            }
        )
        return updated;
    } catch(e) {
        throw new InternalServerError(`미션 상태 업데이트 오류: ${e}`);
    }
}
