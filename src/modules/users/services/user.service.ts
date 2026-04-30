import { UserSignUpRequest } from "../dtos/user.dto"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository";
import bcrypt from "bcrypt";


export const userSignUp = async (data: UserSignUpRequest) => {
  const hashing = await bcrypt.hash(data.password, 10); //bcrypt.hash('해싱할 문자', 숫자) 

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    password: hashing,
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