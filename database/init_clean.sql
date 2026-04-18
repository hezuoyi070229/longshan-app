-- 创建表
CREATE TABLE IF NOT EXISTS activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    creator_name VARCHAR(50) NOT NULL,
    description TEXT,
    category VARCHAR(20),
    min_people INT DEFAULT 10,
    current_people INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    proposed_dates VARCHAR(200),
    scheduled_date DATE,
    location VARCHAR(100),
    location_detail VARCHAR(200),
    cover_image VARCHAR(500),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS activity_signups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    activity_id BIGINT NOT NULL,
    user_id VARCHAR(100),
    user_name VARCHAR(50) NOT NULL,
    user_phone VARCHAR(20),
    signup_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'registered',
    remark VARCHAR(200),
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    INDEX idx_activity_user (activity_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS bus_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(50) DEFAULT 'Guoke-Business',
    direction VARCHAR(10) NOT NULL,
    depart_date DATE NOT NULL,
    depart_time TIME NOT NULL,
    arrive_time TIME,
    max_seats INT DEFAULT 30,
    booked_seats INT DEFAULT 0,
    price DECIMAL(5,2) DEFAULT 5.00,
    status VARCHAR(20) DEFAULT 'available',
    from_location VARCHAR(100),
    to_location VARCHAR(100),
    from_lat DECIMAL(10,8),
    from_lng DECIMAL(11,8),
    to_lat DECIMAL(10,8),
    to_lng DECIMAL(11,8),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date_direction (depart_date, direction),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS bus_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    schedule_id BIGINT NOT NULL,
    user_id VARCHAR(100),
    user_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    booking_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'booked',
    checkin_code VARCHAR(10),
    pay_status VARCHAR(20) DEFAULT 'unpaid',
    pay_amount DECIMAL(5,2),
    FOREIGN KEY (schedule_id) REFERENCES bus_schedules(id),
    INDEX idx_schedule (schedule_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS feedbacks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100),
    user_type VARCHAR(20),
    user_name VARCHAR(50),
    phone VARCHAR(20),
    category VARCHAR(20),
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    images VARCHAR(1000),
    status VARCHAR(20) DEFAULT 'pending',
    official_reply TEXT,
    reply_time DATETIME,
    replier_name VARCHAR(50),
    is_public BOOLEAN DEFAULT TRUE,
    upvotes INT DEFAULT 0,
    priority INT DEFAULT 0,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_public (is_public, create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入测试数据
INSERT INTO activities (title, creator_name, description, category, min_people, current_people, location, proposed_dates, status, scheduled_date) VALUES
('胡说八道PPT大赛', '张同学', '随便什么主题，5分钟乱讲，大家投票选出最离谱的。提供投影仪和翻页笔，自带电脑。', '社交', 10, 15, '远明辉商场2楼共享空间', '2026-05-10,2026-05-17', 'scheduled', '2026-05-10'),
('春日故事会', '李同学', '分享你和怀柔的故事，可以是科研日常、老城记忆、或者纯粹脑洞。提供茶水。', '文艺', 8, 5, '普法公园草坪', '2026-05-11,2026-05-18', 'open', NULL),
('国科大科研设备体验', '王博士', '带科学城的精密仪器来展示，让老城居民触摸科技。需要志愿者协助讲解。', '科普', 6, 3, '远明辉商场1楼广场', '2026-05-10', 'open', NULL),
('二手书交换市集', '陈同学', '带一本旧书，换一本别人的故事。现场提供书签DIY材料。', '文艺', 12, 8, '鞋帽店前空地', '2026-05-17,2026-05-24', 'open', NULL);

INSERT INTO bus_schedules (direction, depart_date, depart_time, arrive_time, max_seats, booked_seats, price, from_location, to_location, status) VALUES
('去程', '2026-04-19', '14:00', '14:30', 30, 18, 5.00, '国科大西区食堂门口', '商业街十字街口', 'available'),
('返程', '2026-04-19', '21:00', '21:30', 30, 25, 5.00, '商业街十字街口', '国科大西区食堂门口', 'available'),
('去程', '2026-04-20', '10:00', '10:30', 30, 30, 5.00, '国科大西区食堂门口', '商业街十字街口', 'full'),
('返程', '2026-04-20', '18:00', '18:30', 30, 5, 5.00, '商业街十字街口', '国科大西区食堂门口', 'available');

INSERT INTO feedbacks (user_type, user_name, category, title, content, status, official_reply, is_public, upvotes) VALUES
('青年', '张同学', '交通', '希望增加下午班次', '下午2点的班车经常满员，希望能加开3点的一班', 'replied', '已记录需求，下周末将根据预约情况增开班次', TRUE, 23),
('商家', '李老板', '设施', '希望增加路灯照明', '晚上8点后街道比较暗，影响顾客停留', 'processing', NULL, TRUE, 15),
('居民', '王阿姨', '业态', '希望保留传统早餐店', '改造后担心吃不到老味道的油条豆浆了', 'pending', NULL, TRUE, 8);
