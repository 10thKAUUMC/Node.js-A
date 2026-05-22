import {
    Body,
    Controller,
    Get,
    Middlewares,
    Post,
    Query,
    Request,
    Route,
    Tags,
    Path,
    Response,
    SuccessResponse,
    Example,
} from "tsoa";
import { UserSignUpRequest, UserSignUpResponse, UserReviewListResponse } from "../dtos/user.dto";
import { userSignUp, listUserReviews } from "../services/user.service";
import { Request as ExpressRequest } from "express";
import { authorizeUser } from "../../../common/middlewares/auth.middleware";
import { ApiResponse, ApiErrorResponse, success } from "../../../common/responses/response";

@Route("users") 
@Tags("Users") 
export class UserController extends Controller {
  
  /**
   * 새로운 사용자를 등록합니다. (회원가입)
   * 
   * @param body 회원가입에 필요한 사용자 정보 및 선호 카테고리
   * @returns 가입된 사용자의 ID와 선호 카테고리 목록
   */
  @Post("signup")
  @SuccessResponse("200", "회원가입 성공")
  @Response<ApiErrorResponse>(409, "중복된 이메일 에러", {
      resultType: "FAILED",
      error: { errorCode: "U001", message: "이미 존재하는 이메일입니다." },
      data: null
  })
  @Response<ApiErrorResponse>(400, "잘못된 요청 (비밀번호 누락 등)", {
      resultType: "FAILED",
      error: { errorCode: "V001", message: "비밀번호가 누락되었습니다." },
      data: null
  })
  @Example<ApiResponse<UserSignUpResponse>>({
      resultType: "SUCCESS",
      error: null,
      data: {
          userId: 1,
          preferences: ["한식", "일식"]
      }
  })
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    const user = await userSignUp(body); 
    return success(user); 
  }

  /**
   * 특정 사용자가 작성한 리뷰 목록을 조회합니다. (커서 기반 페이지네이션)
   * 
   * @param userId 조회할 사용자의 ID
   * @param cursor 페이지네이션 커서 (마지막 리뷰 ID)
   */
  @Get("{userId}/reviews")
  @SuccessResponse("200", "리뷰 목록 조회 성공")
  @Example<ApiResponse<UserReviewListResponse>>({
      resultType: "SUCCESS",
      error: null,
      data: {
          reviews: [
              { id: 10, storeName: "맛있는 가게", content: "정말 맛있어요!", star: 5 }
          ],
          cursor: 10
      }
  })
  public async handleListUserReviews(
    @Path() userId: number,
    @Query() cursor: number = 0
  ): Promise<ApiResponse<UserReviewListResponse>> {
    const result = await listUserReviews(userId, cursor);
    return success(result);
  }

  /**
   * 게스트 전용 안내 페이지를 반환합니다.
   */
  @Get("guest")
  public async handleGuestPage(): Promise<string> {
    return `
            <h1>게스트 페이지</h1>
            <p>이 페이지는 로그인이 필요 없습니다.</p>
            <ul>
                <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
            </ul>
        `;
  }

  /**
   * 로그인 실패 시 리다이렉트되는 로그인 안내 페이지입니다.
   */
  @Get("login")
  public async handleLoginPage(): Promise<string> {
    return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
  }

  /**
   * 로그인한 사용자만 접근 가능한 마이페이지입니다. (쿠키 인증 필요)
   */
  @Get("mypage")
  @Middlewares(authorizeUser())
  public async handleMypage(@Request() req: ExpressRequest): Promise<string> {
    return `
            <h1>마이페이지</h1>
            <p>환영합니다, ${req.cookies.username}님!</p>
            <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
        `;
  }

  /**
   * 테스트를 위해 로그인 쿠키(username=UMC10th)를 생성합니다.
   */
  @Get("set-login")
  public async handleSetLogin(@Request() req: ExpressRequest): Promise<string> {
    req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });
    return '로그인 쿠키(username=UMC10th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
  }

  /**
   * 로그인 쿠키를 삭제하여 로그아웃 처리합니다.
   */
  @Get("set-logout")
  @SuccessResponse("200", "로그아웃 성공")
  public async handleSetLogout(
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<string>> {
    req.res!.clearCookie("username");
    return success("로그아웃 완료");
  }
}
