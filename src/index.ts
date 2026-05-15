import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan"; // 추가
import cookieParser from "cookie-parser"; // 추가
import { RegisterRoutes } from "./generated/routes";
import { AppError } from "./common/errors/app.error";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAILED",
      error: { errorCode, message, data },
      data: null,
    });
  };
  next();
});

// 2. 미들웨어 설정
app.use(morgan("dev"));               // HTTP 요청 로깅 (morgan)
app.use(cors());                      // cors 방식 허용
app.use(express.static('public'));    // 정적 파일 접근
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(cookieParser());              // req.cookies 사용 (cookie-parser)

// Express.js에 생성한 엔드 포인트들을 register
const router = express.Router();
RegisterRoutes(router);
app.use("/", router);

function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}
// [추가] 전역 오류 처리 미들웨어 (가장 마지막에 위치)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  // AppError인 경우 커스텀 데이터 사용, 아니면 일반 서버 에러 처리
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const errorCode = err instanceof AppError ? err.errorCode : "COMMON_001";
  const message = err.message || "서버 내부 오류가 발생했습니다.";

  (res.status(statusCode) as any).error({
    errorCode,
    message,
    data: err.data || null,
  });
});

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});
