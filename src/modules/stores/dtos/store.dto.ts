export interface ReviewItem {
    id: number;
    content: string;
    store: {
      id: number;
      name: string;
    };
    user: {
      id: number;
      name: string;
    };
  }
  
  export interface ReviewListResponse {
    data: ReviewItem[];
    pagination: {
      cursor: number | null;
    };
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