import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Query,
    Route,
    Tags,
    Path,
    Response,
    SuccessResponse,
    Example,
} from "tsoa";
import { 
    bodyToMission, 
    MissionCreateRequest, 
    MissionCreateResponse, 
    UserMissionCreateResponse,
    InProgressMissionListResponse,
    UserMissionCreateRequest
} from "../dtos/mission.dto";
import { 
    createMission, 
    listMyInProgressMissions, 
    processMissionCompletion,
    createUserMission 
} from "../services/mission.service";
import { ApiResponse, ApiErrorResponse, success } from "../../../common/responses/response";

@Route("users")
@Tags("Missions")
export class UserMissionController extends Controller {
    /**
     * 유저에게 미션을 할당합니다. (미션 도전하기)
     * 
     * @param userId 미션에 도전할 유저의 ID
     * @param body 도전할 미션의 정보
     * @returns 생성된 유저 미션 정보
     */
    @Post("{userId}/missions")
    @SuccessResponse("200", "미션 도전 성공")
    @Response<ApiErrorResponse>(400, "이미 진행 중인 미션", {
        resultType: "FAILED",
        error: { errorCode: "M001", message: "이미 진행 중인 미션입니다." },
        data: null
    })
    @Example<ApiResponse<UserMissionCreateResponse>>({
        resultType: "SUCCESS",
        error: null,
        data: {
            userId: 1,
            missionId: 5,
            userMissionId: 10,
            status: "in_progress"
        }
    })
    public async handleCreateUserMission(
        @Path() userId: number,
        @Body() body: UserMissionCreateRequest
    ): Promise<ApiResponse<UserMissionCreateResponse>> {
        const result = await createUserMission(userId, body.missionId);
        return success(result);
    }

    /**
     * 유저 미션을 완료 처리합니다.
     * 
     * @param userMissionId 완료 처리할 유저 미션의 ID
     * @returns 업데이트된 유저 미션 정보
     */
    @Patch("{userMissionId}/complete")
    @SuccessResponse("200", "미션 완료 처리 성공")
    @Example<ApiResponse<UserMissionCreateResponse>>({
        resultType: "SUCCESS",
        error: null,
        data: {
            userId: 1,
            missionId: 5,
            userMissionId: 10,
            status: "completed"
        }
    })
    public async handleCompleteUserMission(
        @Path() userMissionId: number,
    ): Promise<ApiResponse<UserMissionCreateResponse>> {
        const result = await processMissionCompletion(userMissionId);
        return success(result);
    }

    /**
     * 유저의 진행 중인 미션 목록을 조회합니다. (커서 기반 페이지네이션)
     * 
     * @param userId 조회할 유저의 ID
     * @param cursor 페이지네이션 커서 (마지막 유저 미션 ID)
     */
    @Get("{userId}/in-progress")
    @SuccessResponse("200", "진행 중인 미션 목록 조회 성공")
    @Example<ApiResponse<InProgressMissionListResponse>>({
        resultType: "SUCCESS",
        error: null,
        data: {
            data: [
                {
                    userMissionId: 10,
                    missionId: 5,
                    status: "in_progress",
                    createdAt: new Date(),
                    title: "일주일 3번 방문하기",
                    description: "가게를 3번 방문하여 미션을 완료하세요.",
                    point: 500,
                    storeId: 1
                }
            ],
            pagination: {
                cursor: 10
            }
        }
    })
    public async handleListMyInProgressMissions(
        @Path() userId: number,
        @Query() cursor: number = 0
    ): Promise<ApiResponse<InProgressMissionListResponse>> {
        const result = await listMyInProgressMissions(userId, cursor);
        return success(result);
    }
}

@Route("stores")
@Tags("Missions")
export class MissionController extends Controller {
    /**
     * 가게에 새로운 미션을 생성합니다.
     * 
     * @param storeId 미션을 생성할 가게의 ID
     * @param body 생성할 미션의 상세 정보
     * @returns 생성된 미션 정보
     */
    @Post("{storeId}/missions")
    @SuccessResponse("200", "미션 생성 성공")
    @Response<ApiErrorResponse>(404, "존재하지 않는 가게", {
        resultType: "FAILED",
        error: { errorCode: "ST001", message: "존재하지 않는 가게입니다." },
        data: null
    })
    @Example<ApiResponse<MissionCreateResponse>>({
        resultType: "SUCCESS",
        error: null,
        data: {
            title: "신규 미션",
            description: "미션 설명입니다.",
            storeId: 1,
            missionId: 10,
            point: 1000,
            deadline: new Date()
        }
    })
    public async handleCreateMission(
        @Path() storeId: number,
        @Body() body: MissionCreateRequest
    ): Promise<ApiResponse<MissionCreateResponse>> {
        const data = bodyToMission(body);
        data.storeId = storeId;
        const mission = await createMission(data);
        return success(mission);
    }
}
