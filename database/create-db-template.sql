CREATE DATABASE IF NOT EXISTS umc;
USE umc;
-- 1. 지역 테이블
CREATE TABLE region (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL
);

-- 2. 멤버 테이블
CREATE TABLE member (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    point INT DEFAULT 0
);

-- 3. 가게 테이블
CREATE TABLE store (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    region_id BIGINT,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (region_id) REFERENCES region(id)
);

-- 4. 미션 테이블
CREATE TABLE mission (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_id BIGINT,
    mission_spec TEXT NOT NULL,
    reward INT NOT NULL,
    FOREIGN KEY (store_id) REFERENCES store(id)
);

-- 5. 멤버-미션 매핑 테이블 (진행 상태 포함)
CREATE TABLE member_mission (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT,
    mission_id BIGINT,
    status VARCHAR(20) DEFAULT 'CHALLENGING', -- 진행중, 진행완료 등
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (mission_id) REFERENCES mission(id)
);

-- 6. 리뷰 테이블
CREATE TABLE review (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT,
    store_id BIGINT,
    score FLOAT NOT NULL,
    body TEXT NOT NULL,
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (store_id) REFERENCES store(id)
);