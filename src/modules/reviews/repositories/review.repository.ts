import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config";
import { prisma } from "../../../db.config.js";

export const checkStore = async(storeId: number): Promise<boolean> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore`,
            [storeId]
        );
        return rows[0]?.isExistStore == 1;
    } catch(e) {
        throw new Error(`오류가 발생했어요: ${e}`);
    } finally {
        conn.release();
    }
}

export const addReview = async (data: any): Promise<any> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO review (content, star, storeId, userId) VALUES (?,?,?,?);`,
            [
                data.content,
                data.star,
                data.storeId,
                data.userId,
            ]
        );
    } catch(e) {
        throw new Error(`오류가 발생했어요: ${e}`);
    } finally {
        conn.release();
    }
}

export const getStore = async(storeId: any) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM store WHERE id = ?`,
            [storeId]
        )
    } catch(e) {
        throw new Error(`오류가 발생했어요: ${e}`);
    } finally {
        conn.release();
    }
}

// 목록 조회
export const getReviews = async(storeId: any) => {
    const reviews = await getReviewbyStoreId(storeId);
    return reviews;
}

export const preview