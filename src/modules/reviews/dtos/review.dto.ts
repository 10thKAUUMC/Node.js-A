// 1. 리뷰 생성 요청 데이터의 설계도를 만듭니다.
export interface CreateReviewRequest {
    store_id: number;   // 리뷰를 작성할 가게 ID
    user_id: number;    // 리뷰를 작성하는 사용자 ID
    content: string;    // 리뷰 내용
    star: number;       // 별점 (예: 4.5)
    photos?: string[];  // 사진 URL 목록 (선택 사항)
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 형태로 변환해주는 함수입니다.
export const bodyToReview = (body: CreateReviewRequest) => {
    return {
        storeId: body.store_id,
        userId: body.user_id,
        content: body.content,
        star: body.star,
        photos: body.photos || [], // 사진이 없으면 빈 배열로 처리합니다.
    };
};

// 3. 데이터베이스의 리뷰 정보를 응답 형식으로 변환해주는 함수입니다.
export const responseFromReview = (review: any) => {
    return {
        reviewId: review.review_id,
        content: review.content,
        star: review.star,
        createdAt: review.created_at,
        storeId: review.store_id,
        userId: review.user_id,
    };
};
