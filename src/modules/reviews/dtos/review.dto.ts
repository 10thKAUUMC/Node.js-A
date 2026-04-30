export interface ReviewCreateRequest {
    content: string;
    star: number;
    store_id: number;
}

export const bodyToReview = (body: ReviewCreateRequest) => {
    return {
        content: body.content,
        star: body.star,
        store_id: body.store_id,
    };
}

export const responseFromReview = (review: any) => {
    return {
        reviewId: review.review_id,
        content: review.content,
        star: review.star,
        storeId: review.store_id,
        userId: review.user_id,
    };
}