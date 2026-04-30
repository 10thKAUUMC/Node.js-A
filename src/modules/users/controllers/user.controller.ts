import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes"; //http 응답 상태 코드 -> 상수
import { UserSignUpRequest, bodyToUser } from "../dtos/user.dto";
import { userSignUp } from "../services/user.service";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction ) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
 
	//서비스 로직 호출 
    // req.body를 UserSignUpRequest 타입으로 '강제' (Type Assertion) 해줍니다. 
    const user = await userSignUp(bodyToUser(req.body as UserSignUpRequest));

    //성공 응답 보내기
    res.status(StatusCodes.OK).json({ result: user });
};