import { UserSignUpRequest } from "../dtos/user.dto"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { getUserReviews } from "../repositories/user.repository";

//사용자 리뷰 리스트
export const listUserReviews = async (userId: number, cursor: number) => {
  const reviews = await getUserReviews(userId, cursor);
  
  // 응답 데이터 가공 (DTO 함수 활용)
  return {
    reviews: reviews.map(review => ({
      id: review.id,
      storeName: review.store.name,
      content: review.content,
      // 필요한 다른 필드들...
    })),
    cursor: reviews.length > 0 ? reviews[reviews.length - 1]?.id : null,
  };
}

export const userSignUp = async (data: UserSignUpRequest) => {
  console.log("전달 데이터:", data);
  if (!data || !data.password) {
    console.error("비밀번호가 데이터에 포함되어 있지 않습니다!");
    throw new Error("비밀번호가 누락되었습니다.");
  }

  const hashing = await bcrypt.hash(data.password, 10); //bcrypt.hash('해싱할 문자', 숫자) 

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    password: hashing,
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};