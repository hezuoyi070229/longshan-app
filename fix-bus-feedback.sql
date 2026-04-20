-- 修复班车和反馈表结构
USE longshan;

-- 删除并重新创建班车表（匹配实体类字段）
DROP TABLE IF EXISTS bus_schedules;

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
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 删除并重新创建反馈表（匹配实体类字段）
DROP TABLE IF EXISTS feedbacks;

CREATE TABLE feedbacks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100),
    user_type VARCHAR(50),
    user_name VARCHAR(100),
    phone VARCHAR(20),
    category VARCHAR(50),
    title VARCHAR(255),
    content TEXT,
    images VARCHAR(500),
    status VARCHAR(50) DEFAULT 'pending',
    official_reply TEXT,
    reply_time TIMESTAMP NULL,
    replier_name VARCHAR(100),
    is_public BOOLEAN DEFAULT TRUE,
    upvotes INT DEFAULT 0,
    priority INT DEFAULT 0,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入班车数据
INSERT INTO bus_schedules (route_name, direction, depart_date, depart_time, arrive_time, max_seats, booked_seats, price, status, from_location, to_location) VALUES
('YQ-ZGC Line', 'yq_to_zgc', '2026-04-25', '09:00:00', '10:30:00', 45, 12, 0.00, 'active', 'Yanqihu East Gate', 'Zhongguancun South Gate'),
('ZGC-YQ Line', 'zgc_to_yq', '2026-04-25', '17:30:00', '19:00:00', 45, 8, 0.00, 'active', 'Zhongguancun South Gate', 'Yanqihu East Gate'),
('YQ-ZGC Line', 'yq_to_zgc', '2026-04-26', '14:00:00', '15:30:00', 28, 5, 0.00, 'active', 'Yanqihu East Gate', 'Zhongguancun South Gate'),
('ZGC-YQ Line', 'zgc_to_yq', '2026-04-26', '20:00:00', '21:30:00', 28, 2, 0.00, 'active', 'Zhongguancun South Gate', 'Yanqihu East Gate');

-- 插入反馈数据
INSERT INTO feedbacks (title, content, category, user_name, phone, upvotes, status, official_reply) VALUES
('More academic lectures please', 'Especially interdisciplinary ones', 'Suggestion', 'Zhang', '13800138000', 23, 'replied', 'Thank you for your suggestion! We will arrange more interdisciplinary lectures.'),
('Bus schedule is convenient', 'Add more evening buses', 'Suggestion', 'Li', '13900139000', 18, 'pending', NULL),
('Great activity system', 'Easy to use interface', 'Praise', 'Wang', '13700137000', 15, 'replied', 'Thank you for your feedback! We will continue to improve.');

-- 查看数据
SELECT 'Bus Schedules:' as info;
SELECT * FROM bus_schedules;

SELECT 'Feedbacks:' as info;
SELECT * FROM feedbacks;
