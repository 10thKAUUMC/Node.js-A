DROP DATABASE IF EXISTS umc_study;
CREATE DATABASE umc_study;
USE umc_study;

CREATE TABLE `store` (
	`store_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`name`	varchar(255)	NOT NULL,
	`manager_number`	bigint	NOT NULL,
	`detail_address`	varchar(255)	NOT NULL,
	`region`	bigint	NOT NULL,
	PRIMARY KEY (`store_id`)
);

CREATE TABLE `mission` (
	`mission_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`deadline`	date	NOT NULL,
	`conditional`	varchar(255)	NOT NULL,
	`point`	int	NOT NULL,
	`created_at`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
	`store_id`	bigint	NOT NULL,
	PRIMARY KEY (`mission_id`)
);

CREATE TABLE `food` (
	`food_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`name`	varchar(255)	NULL,
	PRIMARY KEY (`food_id`)
);

CREATE TABLE `User` (
	`user_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`name`	varchar(255)	NOT NULL,
	`gender`	enum('MALE','FEMALE','NONE')	NOT NULL	DEFAULT 'NONE'	COMMENT '성별 ex) MALE, FEMALE, NONE',
	`birth`	date	NOT NULL,
	`address`	varchar(255)	NOT NULL	COMMENT '지역구 ex) 강남구',
	`detail_address`	varchar(255)	NULL,
	`social_id`	varchar(255)	NOT NULL	COMMENT 'OAuth UID',
	`social_type`	enum('KAKAO','NAVER','APPLE','GOOGLE')	NOT NULL	COMMENT 'KAKAO, NAVER, APPLE, GOOGLE',
	`point`	int	NOT NULL	DEFAULT 0,
	`email`	varchar(255)	NOT NULL	UNIQUE,
	`password`	varchar(255)	NOT NULL	COMMENT '해시된 비밀번호',
	`phone_number`	varchar(20)	NULL	COMMENT '010-xxxx-xxxx',
	`deleted_at`	timestamp	NULL,
	`updated_at`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`inactive_date`	timestamp	NULL,
	`status`	varchar(255)	NOT NULL	DEFAULT 'ACTIVE',
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `user_food` (
	`user_food_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`user_id`	bigint	NOT NULL,
	`food_id2`	bigint	NOT NULL,
	PRIMARY KEY (`user_food_id`),
	FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
	FOREIGN KEY (`food_id2`) REFERENCES `food` (`food_id`)
);

CREATE TABLE `user_term` (
	`user_term_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`term_id`	bigint	NOT NULL,
	`user_id`	bigint	NOT NULL,
	PRIMARY KEY (`user_term_id`)
);

CREATE TABLE `review` (
	`review_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`content`	text	NOT NULL,
	`created_at`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`star`	float	NOT NULL,
	`store_id`	bigint	NOT NULL,
	`user_id`	bigint	NOT NULL,
	PRIMARY KEY (`review_id`)
);

CREATE TABLE `review_photo` (
	`review_photo_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`photo_url`	varchar(500)	NULL,
	`review_id`	bigint	NOT NULL,
	PRIMARY KEY (`review_photo_id`)
);

CREATE TABLE `region` (
	`region_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`name`	varchar(255)	NOT NULL,
	PRIMARY KEY (`region_id`)
);

CREATE TABLE `user_mission` (
	`user_mission_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`is_complete`	bit	NOT NULL	DEFAULT 0,
	`user_id`	bigint	NOT NULL,
	`mission_id2`	bigint	NOT NULL,
	PRIMARY KEY (`user_mission_id`)
);

CREATE TABLE `review_comment` (
	`comment_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`content`	text	NOT NULL,
	`review_id`	bigint	NOT NULL,
	PRIMARY KEY (`comment_id`)
);

CREATE TABLE `term` (
	`term_id`	bigint	NOT NULL	AUTO_INCREMENT,
	`name`	varchar(255)	NULL,
	PRIMARY KEY (`term_id`)
);
