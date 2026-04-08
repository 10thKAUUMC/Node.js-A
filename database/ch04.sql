CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    nickname VARCHAR(50),
    phone_num VARCHAR(20),
    gender ENUM('MALE', 'FEMALE', 'NONE'),
    birth_date DATE,
    address VARCHAR(100),
    point INT DEFAULT 0,
    status ENUM('ACTIVE', 'INACTIVE'),
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
);

CREATE TABLE food_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE area (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(50) NOT NULL
);

CREATE TABLE store (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    category_id INT,
    description TEXT,
    addr INT,
    FOREIGN KEY (category_id) REFERENCES food_category(id) ON DELETE SET NULL,
    FOREIGN KEY (addr) REFERENCES area(id)
);

CREATE TABLE preference (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES food_category(id) ON DELETE CASCADE
);

CREATE TABLE mission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT,
    reward INT,
    description TEXT,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
);

CREATE TABLE user_mission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mission_id INT,
    user_id INT,
    status ENUM('ONGOING', 'COMPLETE'),
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (mission_id) REFERENCES mission(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- 내가 진행중, 진행 완료한 미션 모아서 보는 쿼리 (페이징 포함)
SELECT * FROM user_mission
JOIN mission ON mission.id = user_mission.mission_id
WHERE user_mission.user_id = 1 -- 본인의 미션만 보게하기 위해 임의로 id 지정
ORDER BY user_mission.created_at DESC
LIMIT 15 OFFSET 0;

CREATE TABLE review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    description TEXT,
    comment TEXT,
    store_id INT,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- 리뷰 작성하는 쿼리
INSERT INTO review (store_id, user_id, description)
values (10,1,'음 너무 맛있어요');

-- 홈 화면 쿼리 (현재 선택된 지역에서 도전이 가능한 미션 목록, 페이징 포함)
SELECT address FROM area
JOIN user_mission ON status = 'ONGOING'
WHERE user_mission.user_id = 1
ORDER BY user_mission.created_at DESC
LIMIT 15 OFFSET 0;

-- 마이페이지 화면 쿼리
SELECT nickname, email, phone_num, point FROM user
WHERE id = 1;