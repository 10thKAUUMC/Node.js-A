import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { RegisterRoutes } from "./generated/routes";
import { AppError } from "./common/errors/app.error";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Content Security Policy (CSP) 설정
// 브라우저에서 localhost 연결이나 인라인 스크립트가 차단되는 문제를 해결합니다.
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "connect-src 'self' http://localhost:* ws://localhost:*; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data:; " +
    "font-src 'self';"
  );
  next();
});

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
app.use(morgan("dev"));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// TSOA Routes 등록
const router = express.Router();
RegisterRoutes(router);
app.use("/", router);

// Swagger UI 연결
try {
  const swaggerFile = JSON.parse(
    fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
  );
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
} catch (error) {
  console.error("Swagger 파일을 읽어오는데 실패했습니다. 'npm run start'를 먼저 실행했는지 확인해주세요.");
}

// 전역 오류 처리 미들웨어
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
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
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[server]: API Documentation is available at http://localhost:${port}/docs`);
});
