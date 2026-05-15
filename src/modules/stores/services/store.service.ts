import { getAllStoreReviews, getMissionsByStoreIdWithCursor } from '../repositories/store.repository';
import { ReviewListResponse, responseFromReviews } from '../dtos/store.dto';

export const listStoreReviews = async (
    storeId: number,
    cursor: number
  ): Promise<ReviewListResponse> => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(reviews);
  };

export const listStoreMissions = async (storeId: number, cursor: number) => {
    const missions = await getMissionsByStoreIdWithCursor(storeId, cursor);
    return {
        data: missions,
        pagination: {
            cursor: missions.length > 0 ? (missions[missions.length - 1] as any).id : null,
        },
    };
};