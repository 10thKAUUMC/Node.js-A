import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 1. 가게 존재 여부 확인 (미션을 추가하기 전, 가게가 실제로 있는지 검증합니다)
export const getStoreById = async (storeId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT * FROM store WHERE store_id = ?;`,
            [storeId]
        );
        // 결과가 없으면 null을 반환해서 "가게 없음"을 알립니다.
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release(); // 사용한 커넥션은 반드시 반납합니다.
    }
};

// 2. 미션 삽입 (mission 테이블에 새 미션을 추가합니다)
export const addMission = async (data: any): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query<ResultSetHeader>(
            `INSERT INTO mission (deadline, conditional, point, store_id) VALUES (?, ?, ?, ?);`,
            [data.deadline, data.conditional, data.point, data.storeId]
        );
        return result.insertId; // 새로 생성된 미션의 ID를 반환합니다.
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

// 3. 미션 조회 (방금 생성한 미션을 ID로 다시 조회해서 반환합니다)
export const getMissionById = async (missionId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT * FROM mission WHERE mission_id = ?;`,
            [missionId]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};
