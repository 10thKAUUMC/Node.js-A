-- user 테이블 

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  gender ENUM('남성', '여성') NOT NULL,
  birth DATE NOT NULL,
  address VARCHAR(255),
  detail_address VARCHAR(255),
  phone_number VARCHAR(20)
);

-- food_category 테이블 
CREATE TABLE food_category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- user_favor_category 테이블 
CREATE TABLE user_favor_category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  food_category_id INT,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (food_category_id) REFERENCES food_category(id)
);

