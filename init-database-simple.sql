-- 初始化数据库表结构和数据（简化版）
-- 在 MySQL 命令行中执行: source d:/123pan/挑战杯项目/Longshan app/longshan-app/init-database-simple.sql

USE longshan;

-- 1. 活动表
CREATE TABLE IF NOT EXISTS activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    location VARCHAR(255),
    scheduled_date DATE,
    min_people INT DEFAULT 1,
    max_people INT DEFAULT 100,
    current_people INT DEFAULT 0,
    creator_name VARCHAR(100),
    creator_contact VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 活动报名表
CREATE TABLE IF NOT EXISTS activity_signups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    activity_id BIGINT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_contact VARCHAR(100),
    status VARCHAR(50) DEFAULT 'signed_up',
    signup_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 班车时刻表
CREATE TABLE IF NOT EXISTS bus_schedules (
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. 班车预约表
CREATE TABLE IF NOT EXISTS bus_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    schedule_id BIGINT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    checkin_code VARCHAR(20),
    status VARCHAR(50) DEFAULT 'booked',
    pay_status VARCHAR(50) DEFAULT 'pending',
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (schedule_id) REFERENCES bus_schedules(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. 反馈表
CREATE TABLE IF NOT EXISTS feedbacks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(50),
    user_name VARCHAR(100),
    user_contact VARCHAR(100),
    upvotes INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    admin_reply TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入活动数据
INSERT INTO activities (title, description, category, location, scheduled_date, min_people, max_people, current_people, creator_name, status) VALUES
('Academic Lecture: AI Applications', 'Introduction to AI in research', 'Academic', 'Yanqihu Campus', '2026-04-25', 20, 100, 45, 'Prof Wang', 'active'),
('Outdoor Hiking', 'Weekend mountain hiking', 'Outdoor', 'Xiangshan Park', '2026-04-26', 10, 50, 23, 'Outdoor Club', 'active'),
('Movie Screening: Oppenheimer', 'Latest movie screening', 'Entertainment', 'Zhongguancun Campus', '2026-04-24', 30, 100, 78, 'Movie Club', 'active'),
('Python Workshop', 'Python data analysis basics', 'Tech', 'Library', '2026-04-27', 15, 40, 12, 'CS Dept', 'active');

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
