import dotenv from "dotenv";
import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";

// 1. 라우터 임포트
import { storeRouter } from "./modules/stores/store.route.js";
import { missionRouter } from "./modules/missions/mission.route.js";

// 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ⭐ 모든 요청 로깅 (디버깅용) - 라우터 등록 전에!
app.use((req: Request, res: Response, next) => {
  console.log("==========================================");
  console.log(`📨 ${req.method} ${req.url}`);
  console.log("Headers:", req.headers["content-type"]);
  console.log("Body:", req.body);
  console.log("==========================================");
  next();
});

// 3. 라우터 등록
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// 기존 회원가입
app.post("/api/v1/users/signup", handleUserSignUp);

// 신규 추가된 라우터들
app.use("/", storeRouter);   // /regions/:regionId/stores, /stores/:storeId/reviews
app.use("/", missionRouter); // 미션 관련 라우트

// ⭐ 404 핸들러 (가장 마지막에)
app.use((req: Request, res: Response) => {
  console.log("❌ 404 - Route not found:", req.method, req.url);
  res.status(404).json({ 
    error: "Not Found",
    message: `Cannot ${req.method} ${req.url}`
  });
});

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});