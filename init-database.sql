-- 初始化数据库表结构和数据
-- 在 MySQL 命令行中执行: source d:/123pan/挑战杯项目/Longshan app/longshan-app/init-database.sql

USE longshan;

-- 1. 活动表
CREATE TABLE IF NOT EXISTS activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL COMMENT '活动标题',
    description TEXT COMMENT '活动描述',
    category VARCHAR(50) COMMENT '活动分类',
    location VARCHAR(255) COMMENT '活动地点',
    scheduled_date DATE COMMENT '活动日期',
    min_people INT DEFAULT 1 COMMENT '最少人数',
    max_people INT DEFAULT 100 COMMENT '最多人数',
    current_people INT DEFAULT 0 COMMENT '当前报名人数',
    creator_name VARCHAR(100) COMMENT '发起人姓名',
    creator_contact VARCHAR(100) COMMENT '发起人联系方式',
    status VARCHAR(50) DEFAULT '报名中' COMMENT '活动状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. 活动报名表
CREATE TABLE IF NOT EXISTS activity_signups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    activity_id BIGINT NOT NULL COMMENT '活动ID',
    user_name VARCHAR(100) NOT NULL COMMENT '报名人姓名',
    user_contact VARCHAR(100) COMMENT '联系方式',
    status VARCHAR(50) DEFAULT '已报名' COMMENT '报名状态',
    signup_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. 班车时刻表
CREATE TABLE IF NOT EXISTS bus_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(100) COMMENT '线路名称',
    direction VARCHAR(50) COMMENT '方向: yq_to_zgc(雁栖湖到中关村), zgc_to_yq(中关村到雁栖湖)',
    depart_date DATE NOT NULL COMMENT '发车日期',
    depart_time TIME NOT NULL COMMENT '发车时间',
    arrive_time TIME COMMENT '到达时间',
    max_seats INT DEFAULT 45 COMMENT '最大座位数',
    booked_seats INT DEFAULT 0 COMMENT '已预约座位数',
    price DECIMAL(10,2) DEFAULT 0.00 COMMENT '价格',
    status VARCHAR(50) DEFAULT 'active' COMMENT '状态',
    from_location VARCHAR(255) COMMENT '出发地点',
    to_location VARCHAR(255) COMMENT '到达地点',
    from_lat DECIMAL(10,6) COMMENT '出发地纬度',
    from_lng DECIMAL(10,6) COMMENT '出发地经度',
    to_lat DECIMAL(10,6) COMMENT '目的地纬度',
    to_lng DECIMAL(10,6) COMMENT '目的地经度',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. 班车预约表
CREATE TABLE IF NOT EXISTS bus_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    schedule_id BIGINT NOT NULL COMMENT '班次ID',
    user_name VARCHAR(100) NOT NULL COMMENT '预约人姓名',
    phone VARCHAR(20) COMMENT '联系电话',
    checkin_code VARCHAR(20) COMMENT '签到码',
    status VARCHAR(50) DEFAULT '已预约' COMMENT '预约状态',
    pay_status VARCHAR(50) DEFAULT '待支付' COMMENT '支付状态',
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (schedule_id) REFERENCES bus_schedules(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. 反馈表
CREATE TABLE IF NOT EXISTS feedbacks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL COMMENT '反馈标题',
    content TEXT COMMENT '反馈内容',
    category VARCHAR(50) COMMENT '分类',
    user_name VARCHAR(100) COMMENT '反馈人姓名',
    user_contact VARCHAR(100) COMMENT '联系方式',
    upvotes INT DEFAULT 0 COMMENT '点赞数',
    status VARCHAR(50) DEFAULT '待处理' COMMENT '处理状态',
    admin_reply TEXT COMMENT '管理员回复',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 插入演示数据
-- ============================================

-- 插入活动数据
INSERT INTO activities (title, description, category, location, scheduled_date, min_people, max_people, current_people, creator_name, status) VALUES
('学术讲座：人工智能在科研中的应用', '本次讲座将介绍人工智能技术在科研领域的最新应用，包括文献检索、实验设计、学术写作等方面。', '学术', '雁栖湖校区 教一楼 101教室', '2026-04-25', 20, 100, 45, '王教授', '报名中'),
('户外徒步：周末登山活动', '组织同学们一起去香山徒步，享受大自然，锻炼身体，增进友谊。', '户外', '香山公园', '2026-04-26', 10, 50, 23, '户外协会', '报名中'),
('电影放映：《奥本海默》', '放映最新热门电影《奥本海默》，欢迎大家前来观看。', '文艺', '中关村校区 教学楼 301报告厅', '2026-04-24', 30, 100, 78, '电影协会', '报名中'),
('编程工作坊：Python数据分析入门', '手把手教你使用Python进行数据分析，适合零基础同学。', '科普', '雁栖湖校区 图书馆 电子阅览室', '2026-04-27', 15, 40, 12, '计算机学院', '报名中');

-- 插入班车数据
INSERT INTO bus_schedules (route_name, direction, depart_date, depart_time, arrive_time, max_seats, booked_seats, price, status, from_location, to_location, from_lat, from_lng, to_lat, to_lng) VALUES
('雁栖湖-中关村线', 'yq_to_zgc', '2026-04-25', '09:00:00', '10:30:00', 45, 12, 0.00, 'active', '雁栖湖校区东门', '中关村校区南门', 40.4080, 116.6840, 39.9800, 116.3150),
('中关村-雁栖湖线', 'zgc_to_yq', '2026-04-25', '17:30:00', '19:00:00', 45, 8, 0.00, 'active', '中关村校区南门', '雁栖湖校区东门', 39.9800, 116.3150, 40.4080, 116.6840),
('雁栖湖-中关村线', 'yq_to_zgc', '2026-04-26', '14:00:00', '15:30:00', 28, 5, 0.00, 'active', '雁栖湖校区东门', '中关村校区南门', 40.4080, 116.6840, 39.9800, 116.3150),
('中关村-雁栖湖线', 'zgc_to_yq', '2026-04-26', '20:00:00', '21:30:00', 28, 2, 0.00, 'active', '中关村校区南门', '雁栖湖校区东门', 39.9800, 116.3150, 40.4080, 116.6840);

-- 插入反馈数据
INSERT INTO feedbacks (title, content, category, user_name, upvotes, status) VALUES
('希望能增加更多学术讲座活动', '特别是跨学科交流的讲座，有助于拓宽视野，了解其他领域的最新进展。', '建议', '张同学', 23, '已回复'),
('班车预约系统很方便', '建议增加周末晚上的班次，方便同学们参加完活动后返回。', '建议', '李同学', 18, '待处理'),
('活动报名功能很好用', '界面简洁明了，操作方便，希望能增加更多活动类型。', '好评', '王同学', 15, '已回复');

-- 查看插入的数据
SELECT '活动表数据:' AS info;
SELECT * FROM activities;

SELECT '班车表数据:' AS info;
SELECT * FROM bus_schedules;

SELECT '反馈表数据:' AS info;
SELECT * FROM feedbacks;
