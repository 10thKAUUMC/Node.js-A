// 1-3. 가게에 미션 추가하기 요청 Body
export interface MissionAddRequest {
  missionSpec: string;  // 미션 내용 (예: 아메리카노 3잔 구매)
  reward: number;       // 보상 포인트
}

// 1-4. 미션 도전하기 (보통 Path Variable로 처리하지만, 응답 구조 정의용으로 사용 가능)
export interface MissionChallengeResponse {
  memberMissionId: number;
  status: string;
}