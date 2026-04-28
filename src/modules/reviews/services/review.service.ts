import { bodyToReview, responseFromReview } from "../dtos/review.dto.js";
import {
    getStoreById,
    addReview,
    addReviewPhoto,
    getReviewById,
} from "../repositories/review.repository.js";

export const createReview = async (data: ReturnType<typeof bodyToReview>) => {
    // 리뷰를 추가하려는 가게가 존재하는지 먼저 확인합니다.
    const store = await getStoreById(data.storeId);
    if (!store) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    // 리뷰를 저장하고 생성된 ID를 받아옵니다.
    const reviewId = await addReview(data);

    // 사진이 있으면 각각 review_photo 테이블에 저장합니다.
    for (const photoUrl of data.photos) {
        await addReviewPhoto(reviewId, photoUrl);
    }

    // 저장된 리뷰를 다시 조회해서 응답 형식으로 반환합니다.
    const review = await getReviewById(reviewId);
    return responseFromReview(review);
};
