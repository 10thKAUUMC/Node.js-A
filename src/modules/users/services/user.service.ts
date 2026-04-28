import bcrypt from "bcrypt";  // 해싱
import { UserSignUpRequest, bodyToUser, responseFromUser } from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
    addUserFood,
} from "../repositories/user.repository.js";

const convertGender = (gender: string): string => {
    const genderMap: { [key: string]: string } = {
        '남성': 'MALE',
        '여성': 'FEMALE',
        '기타': 'NONE',
        'MALE': 'MALE',
        'FEMALE': 'FEMALE',
        'NONE': 'NONE',
    };
    return genderMap[gender] || 'NONE';
};

export const userSignUp = async (data: ReturnType<typeof bodyToUser>) => {
    // 🔐 비밀번호 해싱 추가
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const joinUserId = await addUser({
        email: data.email,
        name: data.name,
        gender: convertGender(data.gender),
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
        password: hashedPassword,  // ← 해시값으로 저장
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for (const foodId of data.preferences) {
        await addUserFood(joinUserId, foodId);
    }

    const user = await getUser(joinUserId);

    return responseFromUser({ user, preferences: data.preferences });
};