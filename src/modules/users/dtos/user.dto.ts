// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
    email: string;
    name: string;
    password: string;       // ← 추가
    gender: string;
    birth: string;
    address?: string;
    detailAddress?: string;
    phoneNumber: string;
    preferences: number[];
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest) => {
    const birth = new Date(body.birth);

    return {
    email: body.email,
    name: body.name,
    password: body.password,    // ← 추가
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
    };
};

// 3. 데이터베이스의 사용자 정보를 응답 형식으로 변환해주는 함수입니다.
export const responseFromUser = ({ user, preferences }: any) => {
    return {
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detailAddress,
        phoneNumber: user.phoneNumber,
        preferences: preferences,
        // password는 응답에 포함하지 않음 
    };
};