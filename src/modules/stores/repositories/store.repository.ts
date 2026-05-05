import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 가게 추가
export const addStore = async (regionId: number, name: string): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO store (region_id, name) VALUES (?, ?);",
    [regionId, name]
  );
  return result.insertId;
};

// 가게 존재 확인
export const confirmStore = async (storeId: number): Promise<boolean> => {
  const [store] = await pool.query<RowDataPacket[]>(
    "SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;",
    [storeId]
  );
  return !!store[0]?.isExistStore;
};

// 리뷰 추가
export const addReview = async (storeId: number, data: any): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO review (member_id, store_id, score, body) VALUES (?, ?, ?, ?);",
    [data.memberId, storeId, data.score, data.body]
  );
  return result.insertId;
};