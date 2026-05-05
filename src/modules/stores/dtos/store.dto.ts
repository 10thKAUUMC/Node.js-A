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