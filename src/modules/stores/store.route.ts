import express from "express";
import { handleStoreCreate, handleReviewCreate } from "./controllers/store.controller.js";

export const storeRouter = express.Router();

// 1-1. 특정 지역에 가게 추가하기 API
// Postman 주소: POST http://localhost:3000/regions/1/stores
storeRouter.post("/regions/:regionId/stores", handleStoreCreate);

// 1-2. 가게에 리뷰 추가하기 API
// Postman 주소: POST http://localhost:3000/stores/1/reviews
// ⭐ /stores 경로를 명시적으로 추가!
storeRouter.post("/stores/:storeId/reviews", handleReviewCreate);