import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { getUserReviews } from "../repositories/user.repository";
import { DuplicateUserEmailError, ValidationError } from "../../../common/errors/error.js";

//사용자 리뷰 리스트
export const listUserReviews = async (userId: number, cursor: number) => {
  const reviews = await getUserReviews(userId, cursor);
  
  return {
    reviews: reviews.map(review => ({
      id: review.id,
      storeName: review.store.name,
      content: review.content,
      star: review.star,
    })),
    cursor: reviews.length > 0 ? (reviews[reviews.length - 1]?.id ?? null) : null,
  };
}

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  console.log("전달 데이터:", data);
  if (!data || !data.password) {
    console.error("비밀번호가 데이터에 포함되어 있지 않습니다!");
    throw new ValidationError("비밀번호가 누락되었습니다.");
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
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const userId = user!.id; // user가 null이 아님을 확신할 수 있으므로 non-null assertion operator(!)를 사용합니다.
  const preferences = (await getUserPreferencesByUserId(joinUserId))
    .map((obj) => obj.foodCategory?.name)
    .filter((name): name is string => !!name);

  return <UserSignUpResponse>{
    userId,
    preferences,
  };
};
