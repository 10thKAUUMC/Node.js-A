export interface ReviewItem {
    id: number;
    body: string;
    storeId: number;
    userId: number;
}
export interface ReviewListResponse {
    data: ReviewItem[];
    pagination: {
        cursor: number | null;
    };
}
// 가게 추가 요청 전송용
export interface StoreRequest {
  regionId: number;
  name: string;
}

// 리뷰 추가 요청 전송용
export interface ReviewRequest {
  memberId: number;
  score: number;
  body: string;
}
export const responseFromReviews = (
    reviews: ReviewItem[]
  ): ReviewListResponse => {
    const lastReview = reviews[reviews.length - 1];
  
    return {
      data: reviews,
      pagination: {
        cursor: lastReview ? lastReview.id : null,
      },
    };
  };