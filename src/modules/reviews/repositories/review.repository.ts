import { prisma } from "../../../db.config.js";
import { InternalServerError } from "../../../common/errors/error";

export const checkStore = async (storeId: number): Promise<boolean> => {
    try {
        const count = await prisma.store.count({
            where: { id: storeId }
        });
        return count > 0;
    } catch (e) {
        throw new InternalServerError(`오류가 발생했어요: ${e}`);
    }
}

export const addReview = async (data: any): Promise<number> => {
    try {
        const review = await prisma.userStoreReview.create({
            data: {
                content: data.content,
                star: data.star,
                storeId: data.store_id, // data from service has store_id
                userId: data.userId || 1, // data from service has userId (camelCase)
            }
        });
        return review.id;
    } catch (e) {
        throw new InternalServerError(`오류가 발생했어요: ${e}`);
    }
}

export const getReview = async (reviewId: number) => {
    try {
        const review = await prisma.userStoreReview.findFirst({
            where: { id: reviewId }
        });
        return review;
    } catch (e) {
        throw new InternalServerError(`오류가 발생했어요: ${e}`);
    }
}

// 목록 조회
export const getReviewbyStoreId = async (storeId: number, cursor: number = 0) => {
    try {
        const reviews = await prisma.userStoreReview.findMany({
            where: { storeId: storeId, id: { gt: cursor } },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: { id: "asc" },
            take: 10,
        });
        return reviews;
    } catch (e) {
        throw new InternalServerError(`오류가 발생했어요: ${e}`);
    }
}

export const preview = async (storeId: number, cursor: number = 0) => {
    return await getReviewbyStoreId(storeId, cursor);
}
