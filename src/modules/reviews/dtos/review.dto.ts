export interface ReviewCreateRequest {
    content: string;
    star: number;
    store_id: number;
}

export interface ReviewCreateResponse {
    reviewId: number;
    content: string;
    star: number;
    storeId: number;
    userId: number;
}

export const bodyToReview = (body: ReviewCreateRequest) => {
    return {
        content: body.content,
        star: body.star,
        store_id: body.store_id,
    };
}

export const responseFromReview = (review: any): ReviewCreateResponse => {
    return {
        reviewId: review.id,
        content: review.content,
        star: review.star,
        storeId: review.storeId,
        userId: review.userId,
    };
}