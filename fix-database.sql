-- 修复数据库表结构，使字段名与实体类匹配
USE longshan;

-- 删除旧表（如果存在）
DROP TABLE IF EXISTS activity_signups;
DROP TABLE IF EXISTS bus_bookings;
DROP TABLE IF EXISTS feedbacks;
DROP TABLE IF EXISTS bus_schedules;
DROP TABLE IF EXISTS activities;

-- 1. 创建活动表（字段名与实体类匹配）
CREATE TABLE activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    creator_name VARCHAR(100),
    description TEXT,
    category VARCHAR(50),
    min_people INT DEFAULT 1,
    current_people INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    proposed_dates VARCHAR(255),
    scheduled_date DATE,
    location VARCHAR(255),
    location_detail VARCHAR(255),
    cover_image VARCHAR(255),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 创建班车表
CREATE TABLE bus_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(100),
    direction VARCHAR(50),
    depart_date DATE NOT NULL,
    depart_time TIME NOT NULL,
    arrive_time TIME,
    max_seats INT DEFAULT 45,
    booked_seats INT DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'active',
    from_location VARCHAR(255),
    to_location VARCHAR(255),
    from_lat DECIMAL(10,6),
    from_lng DECIMAL(10,6),
    to_lat DECIMAL(10,6),
    to_lng DECIMAL(10,6),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 创建反馈表
CREATE TABLE feedbacks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    category VARCHAR(50),
    user_name VARCHAR(100),
    user_contact VARCHAR(100),
    upvotes INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    admin_reply TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入活动数据
INSERT INTO activities (title, creator_name, description, category, min_people, current_people, status, scheduled_date, location) VALUES
('Academic Lecture: AI Applications', 'Prof Wang', 'Introduction to AI in research', 'Academic', 20, 45, 'active', '2026-04-25', 'Yanqihu Campus'),
('Outdoor Hiking', 'Outdoor Club', 'Weekend mountain hiking', 'Outdoor', 10, 23, 'active', '2026-04-26', 'Xiangshan Park'),
('Movie Screening: Oppenheimer', 'Movie Club', 'Latest movie screening', 'Entertainment', 30, 78, 'active', '2026-04-24', 'Zhongguancun Campus'),
('Python Workshop', 'CS Dept', 'Python data analysis basics', 'Tech', 15, 12, 'active', '2026-04-27', 'Library');

-- 插入班车数据
INSERT INTO bus_schedules (route_name, direction, depart_date, depart_time, arrive_time, max_seats, booked_seats, price, status, from_location, to_location) VALUES
('YQ-ZGC Line', 'yq_to_zgc', '2026-04-25', '09:00:00', '10:30:00', 45, 12, 0.00, 'active', 'Yanqihu East Gate', 'Zhongguancun South Gate'),
('ZGC-YQ Line', 'zgc_to_yq', '2026-04-25', '17:30:00', '19:00:00', 45, 8, 0.00, 'active', 'Zhongguancun South Gate', 'Yanqihu East Gate'),
('YQ-ZGC Line', 'yq_to_zgc', '2026-04-26', '14:00:00', '15:30:00', 28, 5, 0.00, 'active', 'Yanqihu East Gate', 'Zhongguancun South Gate'),
('ZGC-YQ Line', 'zgc_to_yq', '2026-04-26', '20:00:00', '21:30:00', 28, 2, 0.00, 'active', 'Zhongguancun South Gate', 'Yanqihu East Gate');

-- 插入反馈数据
INSERT INTO feedbacks (title, content, category, user_name, upvotes, status) VALUES
('More academic lectures please', 'Especially interdisciplinary ones', 'Suggestion', 'Zhang', 23, 'replied'),
('Bus schedule is convenient', 'Add more evening buses', 'Suggestion', 'Li', 18, 'pending'),
('Great activity system', 'Easy to use interface', 'Praise', 'Wang', 15, 'replied');

-- 查看数据
SELECT 'Activities:' as info;
SELECT * FROM activities;

SELECT 'Bus Schedules:' as info;
SELECT * FROM bus_schedules;

SELECT 'Feedbacks:' as info;
SELECT * FROM feedbacks;
