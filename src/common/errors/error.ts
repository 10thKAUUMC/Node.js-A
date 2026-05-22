import { AppError } from "./app.error";

export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001",
      statusCode: 409,
      message,
      data,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "S001",
      statusCode: 500,
      message,
      data,
    });
  }
}

export class StoreNotFoundError extends AppError {
  constructor(message: string = "존재하지 않는 가게입니다.", data?: unknown) {
    super({
      errorCode: "ST001",
      statusCode: 404,
      message,
      data,
    });
  }
}

export class MissionAlreadyInProgressError extends AppError {
  constructor(message: string = "이미 진행 중인 미션입니다.", data?: unknown) {
    super({
      errorCode: "M001",
      statusCode: 400,
      message,
      data,
    });
  }
}

export class ValidationError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "V001",
      statusCode: 400,
      message,
      data,
    });
  }
}
