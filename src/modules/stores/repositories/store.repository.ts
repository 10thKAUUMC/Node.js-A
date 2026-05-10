import { prisma } from "../../../db.config.js";

// 1. 가게 추가
export const addStore = async (regionId: number, name: string): Promise<number> => {
  const result = await prisma.store.create({
    data: {
      regionId: regionId, // 스키마의 필드명이 regionId인 경우
      name: name,
    },
  });
  return result.id;
};

// 2. 가게 존재 확인
export const confirmStore = async (storeId: number): Promise<boolean> => {
  const store = await prisma.store.findFirst({
    where: { id: storeId },
  });
  return !!store;
};

// 3. 리뷰 추가
export const addReview = async (storeId: number, data: any): Promise<number> => {
  const result = await prisma.review.create({
    data: {
      storeId: storeId,
      userId: data.memberId, // 스키마 필드명에 맞춰 userId 또는 memberId 사용
      score: data.score,
      body: data.body,
    },
  });
  return result.id;
};

// 4. 리뷰 목록 조회
export const getAllStoreReviews = async (storeId: number) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      storeId: true,
      userId: true,
      user: {
        select: { name: true }
      }
    },
    where: { storeId },
    orderBy: { id: "asc" }
  });

  return reviews;
};