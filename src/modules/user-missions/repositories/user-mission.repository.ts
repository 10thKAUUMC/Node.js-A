import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 1. 이미 도전 중인 미션인지 확인합니다.
//    같은 사용자가 같은 미션을 is_complete=0(완료 안 됨) 상태로 이미 갖고 있으면 중복 도전입니다.
export const getInProgressMission = async (userId: number, missionId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT * FROM user_mission WHERE user_id = ? AND mission_id2 = ? AND is_complete = 0;`,
            [userId, missionId]
        );
        // 결과가 있으면 이미 도전 중이라는 뜻입니다.
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release(); // 사용한 커넥션은 반드시 반납합니다.
    }
};

// 2. 도전 미션 삽입 (user_mission 테이블에 새 도전 기록을 추가합니다)
export const addUserMission = async (data: any): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query<ResultSetHeader>(
            // is_complete의 기본값이 0(미완료)이므로 따로 넣지 않아도 됩니다.
            `INSERT INTO user_mission (user_id, mission_id2) VALUES (?, ?);`,
            [data.userId, data.missionId]
        );
        return result.insertId; // 새로 생성된 도전 기록의 ID를 반환합니다.
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

// 3. 도전 미션 조회 (방금 생성한 기록을 ID로 다시 조회해서 반환합니다)
export const getUserMissionById = async (userMissionId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT * FROM user_mission WHERE user_mission_id = ?;`,
            [userMissionId]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};
