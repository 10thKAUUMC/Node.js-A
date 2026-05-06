import { prisma } from "../../../db.config.js";


export const getAllStoreReviews = async (
    storeId: number,
    cursor: number
  ) => {
    const reviews = await prisma.userStoreReview.findMany({
      select: {
        id: true,
        content: true,
        store: true,
        user: true,
      },
      where: {
        storeId,
        id: {
          gt: cursor,
        },
      },
      orderBy: {
        id: "asc",
      },
      take: 5,
    });
  
    return reviews;
};

export const getMissionsByStoreIdWithCursor = async (storeId: number, cursor: number) => {
  return await prisma.mission.findMany({
    where: {
      storeId: storeId,
      id: {
        gt: cursor, // 전달받은 cursor(ID)보다 큰 데이터부터
      },
    },
    take: 10, // 한 번에 10개씩 조회
    orderBy: {
      id: "asc",
    },
  });
};

