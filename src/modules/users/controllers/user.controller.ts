import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest, bodyToUser } from "../dtos/user.dto";
import { userSignUp } from "../services/user.service";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);

    try {
        // 1. DTO 변환 및 서비스 로직 호출 (단 한 번만 실행)
        // bodyToUser를 통해 데이터를 가공한 후 userSignUp 서비스를 호출합니다.
        const user = await userSignUp(bodyToUser(req.body as UserSignUpRequest));

        // 2. 성공 응답 보내기 (하나만 남김)
        res.status(StatusCodes.CREATED).json({
            isSuccess: true,
            code: StatusCodes.CREATED,
            message: "회원가입에 성공했습니다.",
            result: user,
        });
    } catch (e) {
        // 3. 에러 발생 시 로그를 남기고 클라이언트에 에러 응답
        console.error("회원가입 에러 발생:", e);
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            isSuccess: false,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: e instanceof Error ? e.message : "회원가입 실패",
        });
    }
};