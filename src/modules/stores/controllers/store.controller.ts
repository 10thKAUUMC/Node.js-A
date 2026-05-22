import {
    Controller,
    Get,
    Query,
    Route,
    Tags,
    Path,
    SuccessResponse,
    Example,
} from "tsoa";
import { listStoreReviews, listStoreMissions } from "../services/store.service";
import { ApiResponse, success } from "../../../common/responses/response";
import { ReviewListResponse, MissionListResponse } from "../dtos/store.dto";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
    /**
     * 특정 가게의 리뷰 목록을 조회합니다. (커서 기반 페이지네이션)
     * 
     * @param storeId 조회할 가게의 ID
     * @param cursor 페이지네이션 커서 (마지막 리뷰 ID)
     */
    @Get("{storeId}/reviews")
    @SuccessResponse("200", "리뷰 목록 조회 성공")
    @Example<ApiResponse<ReviewListResponse>>({
        resultType: "SUCCESS",
        error: null,
        data: {
            data: [
                {
                    id: 1,
                    content: "좋아요!",
                    store: { id: 10, name: "스타벅스" },
                    user: { id: 5, name: "홍길동" }
                }
            ],
            pagination: {
                cursor: 1
            }
        }
    })
    public async handleListStoreReviews(
        @Path() storeId: number,
        @Query() cursor: number = 0
    ): Promise<ApiResponse<ReviewListResponse>> {
        const reviews = await listStoreReviews(storeId, cursor);
        return success(reviews);
    }

    /**
     * 특정 가게의 미션 목록을 조회합니다. (커서 기반 페이지네이션)
     * 
     * @param storeId 조회할 가게의 ID
     * @param cursor 페이지네이션 커서 (마지막 미션 ID)
     */
    @Get("{storeId}/missions")
    @SuccessResponse("200", "미션 목록 조회 성공")
    @Example<ApiResponse<MissionListResponse>>({
        resultType: "SUCCESS",
        error: null,
        data: {
            data: [
                {
                    title: "일주일 3번 방문",
                    description: "3번 방문 시 포인트 지급",
                    storeId: 10,
                    missionId: 100,
                    point: 500,
                    deadline: new Date()
                }
            ],
            pagination: {
                cursor: 100
            }
        }
    })
    public async handleListStoreMissions(
        @Path() storeId: number,
        @Query() cursor: number = 0
    ): Promise<ApiResponse<MissionListResponse>> {
        const missions = await listStoreMissions(storeId, cursor);
        return success(missions);
    }
}
