import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 미션 추가
export const addMission = async (storeId: number, spec: string, reward: number): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO mission (store_id, mission_spec, reward) VALUES (?, ?, ?);",
    [storeId, spec, reward]
  );
  return result.insertId;
};

// 도전 중인 미션인지 확인
export const isMissionPresent = async (memberId: number, missionId: number): Promise<boolean> => {
  const [confirm] = await pool.query<RowDataPacket[]>(
    "SELECT EXISTS(SELECT 1 FROM member_mission WHERE member_id = ? AND mission_id = ? AND status = 'CHALLENGING') as isExist;",
    [memberId, missionId]
  );
  return !!confirm[0]?.isExist;
};

// 미션 도전 등록
export const addMemberMission = async (memberId: number, missionId: number): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO member_mission (member_id, mission_id, status) VALUES (?, ?, 'CHALLENGING');",
    [memberId, missionId]
  );
  return result.insertId;
};