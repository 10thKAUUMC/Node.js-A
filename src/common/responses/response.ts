export interface ApiResponse<T> {
    resultType: "SUCCESS";
    error: null;
    data: T;
}

export interface ApiErrorResponse {
    resultType: "FAILED";
    error: {
        errorCode: string;
        message: string;
        data?: any;
    };
    data: null;
}

export const success = <T>(data: T): ApiResponse<T> => ({
    resultType: "SUCCESS",
    error: null,
    data,
});
