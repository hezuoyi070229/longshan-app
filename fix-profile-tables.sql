-- 修复个人中心需要的表
USE longshan;

-- 创建活动报名表（匹配实体类字段）
DROP TABLE IF EXISTS activity_signups;

CREATE TABLE activity_signups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    activity_id BIGINT NOT NULL,
    user_id VARCHAR(100),
    user_name VARCHAR(100),
    user_phone VARCHAR(20),
    signup_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'signed_up',
    remark VARCHAR(255),
    FOREIGN KEY (activity_id) REFERENCES activities(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建班车预约表（匹配实体类字段）
DROP TABLE IF EXISTS bus_bookings;

CREATE TABLE bus_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    schedule_id BIGINT NOT NULL,
    user_id VARCHAR(100),
    user_name VARCHAR(100),
    phone VARCHAR(20),
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'booked',
    checkin_code VARCHAR(20),
    pay_status VARCHAR(50) DEFAULT 'pending',
    pay_amount DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (schedule_id) REFERENCES bus_schedules(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入一些测试数据（个人中心展示用）
INSERT INTO activity_signups (activity_id, user_id, user_name, user_phone, status) VALUES
(1, 'user001', 'Test User', '13800138000', 'signed_up'),
(2, 'user001', 'Test User', '13800138000', 'signed_up');

INSERT INTO bus_bookings (schedule_id, user_id, user_name, phone, status, checkin_code) VALUES
(1, 'user001', 'Test User', '13800138000', 'booked', 'ABC123'),
(2, 'user001', 'Test User', '13800138000', 'booked', 'DEF456');

-- 查看数据
SELECT 'Activity Signups:' as info;
SELECT * FROM activity_signups;

SELECT 'Bus Bookings:' as info;
SELECT * FROM bus_bookings;
