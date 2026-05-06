import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config";

//mission을 넣을 가게 존재 여부
export const checkStore = async(storeId: number): Promise<boolean> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await pool.query<RowDataPacket[]>( //rows를 쓰는 이유? : // 구조 분해 할당을 사용 -> const [rows, fields] = await conn.query(...); (선호사항)
            `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
            [storeId]
        );
        //가게 존재
        return rows[0]?.isExistStore == 1;
    } catch(e) { //가게 존재 X
        throw new Error(`오류가 발생했어요: ${e}`);
    } finally {
        conn.release();
    }
}

//mission 데이터 삽입
export const addMission = async (data: any): Promise<any> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO mission (title, description, store_id) VALUES (?, ?, ?);`,
            [
                data.title,
                data.description,
                data.storeId,
            ]
        );
        return result.insertId;
    } catch (e) {
        throw new Error(`오류가 발생했어요: ${e}`);
    } finally {
        conn.release();
    }
}

//mission 조회
export const getMission = async (missionId: any) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM mission WHERE mission_id = ?`,
            [missionId]
        )
        return rows[0];
    } catch(e) {
        throw new Error(`오류가 발생했어요: ${e}`);
    } finally {
        conn.release();
    }
}