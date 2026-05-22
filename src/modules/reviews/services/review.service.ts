import { bodyToReview, responseFromReview } from '../dtos/review.dto';
import {
    checkStore,
    addReview,
    getReview,
} from '../repositories/review.repository';
import { StoreNotFoundError } from "../../../common/errors/error";

export const createReview = async (data: any) => {
    const checkStoreExist = await checkStore(data.store_id);
    if (!checkStoreExist) {
        throw new StoreNotFoundError("존재하지 않는 가게입니다.");
    }
    const reviewId = await addReview(data);

    const review = await getReview(reviewId);
    return responseFromReview(review);
}
