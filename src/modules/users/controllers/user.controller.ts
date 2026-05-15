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
} from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto";
import { userSignUp, listUserReviews } from "../services/user.service";
import { Request as ExpressRequest, Response, NextFunction } from "express";
import { authorizeUser } from "../../../common/middlewares/auth.middleware";
import { StatusCodes } from "http-status-codes";
import { ApiResponse, success } from "../../../common/responses/response";

// @Route("users")는 이 컨트롤러의 모든 엔드포인트 앞에 /users가 붙음을 의미합니다.
@Route("users") 
@Tags("Users") // Swagger 문서에서 'Users' 그룹으로 분류됩니다.
export class UserController extends Controller {
  
  /**
   * 회원가입을 처리합니다. (U_01)
   * @Post("signup")은 /api/v1/users/signup 경로로 매핑됩니다.
   */
  @Post("signup")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    const user = await userSignUp(body); 
    return success(user); 
  }

  /**
   * 특정 사용자의 리뷰 목록을 조회합니다. (U_08 관련)
   * {userId}는 경로 파라미터로, @Query는 쿼리 스트링(?cursor=...)으로 전달받습니다.
   */
  @Get("{userId}/reviews")
  public async handleListUserReviews(
    userId: number,
    @Query() cursor: number = 0
  ): Promise<any> {
    return await listUserReviews(userId, cursor);
  }

  /**
   * 게스트 페이지 (로그인 여부와 상관없이 접근 가능)
   * 브라우저에서 /api/v1/users/guest로 접속 시 보입니다.
   */
  @Get("guest")
  public async handleGuestPage(): Promise<string> { // String -> string 권장
    return `
            <h1>게스트 페이지</h1>
            <p>이 페이지는 로그인이 필요 없습니다.</p>
            <ul>
                <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
            </ul>
        `;
  }

  @Get("login")
  public async handleLoginPage(): Promise<string> {
    return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
  }

  /**
   * 마이페이지 (인증 미들웨어가 적용되어 쿠키가 있어야 접근 가능)
   */
  @Get("mypage")
  @Middlewares(authorizeUser()) // authorizeUser 미들웨어를 통해 권한을 체크합니다.
  public async handleMypage(@Request() req: ExpressRequest): Promise<string> {
    return `
            <h1>마이페이지</h1>
            <p>환영합니다, ${req.cookies.username}님!</p>
            <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
        `;
  }

  /**
   * 테스트용 로그인 쿠키를 생성합니다.
   */
  @Get("set-login")
  public async handleSetLogin(@Request() req: ExpressRequest): Promise<string> {
    // res.cookie를 사용하여 브라우저에 username 쿠키를 저장합니다.
    req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });
    return '로그인 쿠키(username=UMC10th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
  }

  /**
   * 로그인 쿠키를 삭제(로그아웃)합니다.
   */
  @Get("set-logout")
  public async handleSetLogout(
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<string>> {
    req.res!.clearCookie("username");
    return success("로그아웃 완료"); //성공 응답
  }
  }

  export const handleListUserReviews = async (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId as string, 10);
      const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor, 10) : 0;

      const reviews = await listUserReviews(userId, cursor);
      res.status(StatusCodes.OK).json(reviews);
    } catch (err) {
      next(err);
    }
  };
