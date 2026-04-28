import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 1. 가게 존재 여부 확인 (리뷰를 추가하기 전, 가게가 실제로 있는지 검증합니다)
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

// 2. 리뷰 삽입 (review 테이블에 새 리뷰를 추가합니다)
export const addReview = async (data: any): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query<ResultSetHeader>(
            `INSERT INTO review (content, star, store_id, user_id) VALUES (?, ?, ?, ?);`,
            [data.content, data.star, data.storeId, data.userId]
        );
        return result.insertId; // 새로 생성된 리뷰의 ID를 반환합니다.
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

// 3. 리뷰 사진 삽입 (사진이 있는 경우 review_photo 테이블에 저장합니다)
export const addReviewPhoto = async (reviewId: number, photoUrl: string): Promise<void> => {
    const conn = await pool.getConnection();
    try {
        await conn.query(
            `INSERT INTO review_photo (photo_url, review_id) VALUES (?, ?);`,
            [photoUrl, reviewId]
        );
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};

// 4. 리뷰 조회 (방금 생성한 리뷰를 ID로 다시 조회해서 반환합니다)
export const getReviewById = async (reviewId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT * FROM review WHERE review_id = ?;`,
            [reviewId]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    } finally {
        conn.release();
    }
};
