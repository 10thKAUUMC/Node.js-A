import { prisma } from "../../../db.config.js";

// 1. User 데이터 삽입
export const addUser = async (data: any): Promise<number | null> => {
  // 이메일 중복 확인
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) return null;

  const result = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: new Date(data.birth), // 날짜 형식 변환
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    },
  });
  return result.id;
};

// 2. 사용자 정보 얻기
export const getUser = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

// 3. 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number): Promise<void> => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 4. 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId: userId },
    include: {
      foodCategory: true, // Join 대신 include 사용
    },
    orderBy: { foodCategoryId: "asc" },
  });
};

// 5. 내가 작성한 리뷰 목록 조회 (6주차 미션1)
export const getUserReviews = async (userId: number, cursor?: number) => {
    return await prisma.review.findMany({
        where: { userId: userId },
        take: 10,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        include: { store: { select: { name: true } } },
        orderBy: { id: "desc" }
    });
};