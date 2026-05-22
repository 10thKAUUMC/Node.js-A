import {
    Body,
    Controller,
    Post,
    Route,
    Tags,
    SuccessResponse,
    Response,
    Example,
} from "tsoa";
import { createReview } from "../services/review.service";
import { ReviewCreateRequest, ReviewCreateResponse } from "../dtos/review.dto";
import { ApiResponse, ApiErrorResponse, success } from "../../../common/responses/response";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
    /**
     * 새로운 리뷰를 생성합니다.
     * 
     * @param body 생성할 리뷰의 상세 정보 (내용, 별점, 가게 ID)
     * @returns 생성된 리뷰의 상세 정보
     */
    @Post()
    @SuccessResponse("200", "리뷰 생성 성공")
    @Response<ApiErrorResponse>(404, "존재하지 않는 가게", {
        resultType: "FAILED",
        error: { errorCode: "ST001", message: "존재하지 않는 가게입니다." },
        data: null
    })
    @Example<ApiResponse<ReviewCreateResponse>>({
        resultType: "SUCCESS",
        error: null,
        data: {
            reviewId: 1,
            content: "정말 맛있어요!",
            star: 5,
            storeId: 10,
            userId: 5
        }
    })
    public async handleCreateReview(
        @Body() body: ReviewCreateRequest
    ): Promise<ApiResponse<ReviewCreateResponse>> {
        console.log("리뷰 생성을 요청했습니다!");
        console.log("body:", body);
        
        const review = await createReview(body);
        return success(review);
    }
}
