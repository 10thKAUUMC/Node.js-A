import * as storeRepo from "../repositories/store.repository.js";

export const createStore = async (regionId: number, name: string) => {
  const storeId = await storeRepo.addStore(regionId, name);
  return { id: storeId, regionId, name };
};

export const createReview = async (storeId: number, data: any) => {
  const isExist = await storeRepo.confirmStore(storeId);
  if (!isExist) throw new Error("해당 가게가 존재하지 않습니다.");
  
  const reviewId = await storeRepo.addReview(storeId, data);
  return { id: reviewId, ...data };
};

// --- 이미지(image_daea42.png) 내용 추가 ---

/**
 * 특정 가게의 리뷰 목록을 조회하여 DTO 형식으로 반환합니다.
 */
export const listStoreReviews = async (storeId: number, cursor: number) => {
  // 1. Repository를 호출하여 DB에서 리뷰 데이터를 가져옵니다.
  const reviews = await storeRepo.getAllStoreReviews(storeId);

  // 2. 가져온 데이터를 응답 형식(DTO)에 맞춰 변환하여 반환합니다.
  return responseFromReviews(reviews);
};

/**
 * DB 데이터를 응답용 객체로 변환하는 헬퍼 함수 (DTO 변환 로직)
 */
const responseFromReviews = (reviews: any) => {
  return {
    data: reviews,
    cursorId: reviews.length > 0 ? reviews[reviews.length - 1].id : null
  };
};