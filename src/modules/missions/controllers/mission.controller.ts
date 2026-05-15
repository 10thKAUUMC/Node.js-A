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
import { ApiResponse, success } from "../../../common/responses/response";

@Route("users")
@Tags("Missions")
export class UserMissionController extends Controller {
    /**
     * 유저에게 미션을 할당합니다. (미션 도전하기)
     */
    @Post("{userId}/missions")
    public async handleCreateUserMission(
        @Path() userId: number,
        @Body() body: UserMissionCreateRequest
    ): Promise<ApiResponse<UserMissionCreateResponse>> {
        const result = await createUserMission(userId, body.missionId);
        return success(result);
    }

    /**
     * 유저 미션을 완료 처리합니다.
     */
    @Patch("{userMissionId}/complete")
    public async handleCompleteUserMission(
        @Path() userMissionId: number,
    ): Promise<ApiResponse<UserMissionCreateResponse>> {
        const result = await processMissionCompletion(userMissionId);
        return success(result);
    }

    /**
     * 유저의 진행 중인 미션 목록을 조회합니다.
     */
    @Get("{userId}/in-progress")
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
     */
    @Post("{storeId}/missions")
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
