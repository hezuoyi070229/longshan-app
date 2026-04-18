-- 龙山青年共创实验室 - 数据库初始化脚本
-- 创建数据库
CREATE DATABASE IF NOT EXISTS longshan_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE longshan_db;

-- 1. 活动表（activities）
CREATE TABLE IF NOT EXISTS activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '活动ID',
    title VARCHAR(100) NOT NULL COMMENT '活动名称',
    creator_name VARCHAR(50) NOT NULL COMMENT '发起人姓名',
    description TEXT COMMENT '活动描述',
    category VARCHAR(20) COMMENT '分类：社交/竞技/文艺/科普/其他',
    min_people INT DEFAULT 10 COMMENT '最低成行人数',
    current_people INT DEFAULT 0 COMMENT '当前报名人数',
    status VARCHAR(20) DEFAULT '报名中' COMMENT '状态：报名中/已排期/已结束/已取消',
    proposed_dates VARCHAR(200) COMMENT '建议日期，逗号分隔',
    scheduled_date DATE COMMENT '平台确定的举办日期',
    location VARCHAR(100) COMMENT '举办地点',
    location_detail VARCHAR(200) COMMENT '详细地址',
    cover_image VARCHAR(500) COMMENT '封面图URL',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文化活动表';

-- 2. 活动报名表（activity_signups）
CREATE TABLE IF NOT EXISTS activity_signups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    activity_id BIGINT NOT NULL COMMENT '关联活动ID',
    user_id VARCHAR(100) COMMENT '用户唯一标识',
    user_name VARCHAR(50) NOT NULL COMMENT '报名人姓名',
    user_phone VARCHAR(20) COMMENT '联系电话',
    signup_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT '已报名' COMMENT '已报名/已签到/已取消',
    remark VARCHAR(200) COMMENT '备注',
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    INDEX idx_activity_user (activity_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. 班车班次表（bus_schedules）
CREATE TABLE IF NOT EXISTS bus_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(50) DEFAULT '国科大↔商业街' COMMENT '线路名称',
    direction VARCHAR(10) NOT NULL COMMENT '去程/返程',
    depart_date DATE NOT NULL COMMENT '发车日期',
    depart_time TIME NOT NULL COMMENT '发车时间',
    arrive_time TIME COMMENT '预计到达时间',
    max_seats INT DEFAULT 30 COMMENT '总座位数',
    booked_seats INT DEFAULT 0 COMMENT '已预约座位',
    price DECIMAL(5,2) DEFAULT 5.00 COMMENT '票价（元）',
    status VARCHAR(20) DEFAULT '可预约' COMMENT '可预约/已满/已发车/已取消',
    from_location VARCHAR(100) COMMENT '起点',
    to_location VARCHAR(100) COMMENT '终点',
    from_lat DECIMAL(10,8) COMMENT '起点纬度',
    from_lng DECIMAL(11,8) COMMENT '起点经度',
    to_lat DECIMAL(10,8) COMMENT '终点纬度',
    to_lng DECIMAL(11,8) COMMENT '终点经度',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date_direction (depart_date, direction),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='班车班次表';

-- 4. 班车预约表（bus_bookings）
CREATE TABLE IF NOT EXISTS bus_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    schedule_id BIGINT NOT NULL COMMENT '关联班次ID',
    user_id VARCHAR(100) COMMENT '用户标识',
    user_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL COMMENT '联系电话',
    booking_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT '已预约' COMMENT '已预约/已上车/已取消/已过期',
    checkin_code VARCHAR(10) COMMENT '上车验证码',
    pay_status VARCHAR(20) DEFAULT '待支付' COMMENT '待支付/已支付/已退款',
    pay_amount DECIMAL(5,2) COMMENT '实付金额',
    FOREIGN KEY (schedule_id) REFERENCES bus_schedules(id),
    INDEX idx_schedule (schedule_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. 反馈表（feedbacks）
CREATE TABLE IF NOT EXISTS feedbacks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) COMMENT '用户标识',
    user_type VARCHAR(20) COMMENT '身份：青年/商家/居民/其他',
    user_name VARCHAR(50),
    phone VARCHAR(20),
    category VARCHAR(20) COMMENT '分类：交通/设施/业态/环境/管理/其他',
    title VARCHAR(100) NOT NULL COMMENT '反馈标题',
    content TEXT NOT NULL COMMENT '详细内容',
    images VARCHAR(1000) COMMENT '图片URL',
    status VARCHAR(20) DEFAULT '待处理' COMMENT '待处理/处理中/已解决/已回复/已关闭',
    official_reply TEXT COMMENT '政府/平台回复',
    reply_time DATETIME COMMENT '回复时间',
    replier_name VARCHAR(50) COMMENT '回复人',
    is_public BOOLEAN DEFAULT TRUE COMMENT '是否公开显示',
    upvotes INT DEFAULT 0 COMMENT '点赞数',
    priority INT DEFAULT 0 COMMENT '优先级：0普通/1较高/2紧急',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_public (is_public, create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='意见反馈表';

-- ============================================
-- 插入测试数据
-- ============================================

-- 活动测试数据
INSERT INTO activities (title, creator_name, description, category, min_people, current_people, location, proposed_dates, status, scheduled_date) VALUES
('胡说八道PPT大赛', '张同学', '随便什么主题，5分钟乱讲，大家投票选出最离谱的。提供投影仪和翻页笔，自带电脑。', '社交', 10, 15, '远明辉商场2楼共享空间', '2026-05-10,2026-05-17', '已排期', '2026-05-10'),
('春日故事会', '李同学', '分享你和怀柔的故事，可以是科研日常、老城记忆、或者纯粹脑洞。提供茶水。', '文艺', 8, 5, '普法公园草坪', '2026-05-11,2026-05-18', '报名中', NULL),
('国科大科研设备体验', '王博士', '带科学城的精密仪器来展示，让老城居民触摸科技。需要志愿者协助讲解。', '科普', 6, 3, '远明辉商场1楼广场', '2026-05-10', '报名中', NULL),
('二手书交换市集', '陈同学', '带一本旧书，换一本别人的故事。现场提供书签DIY材料。', '文艺', 12, 8, '鞋帽店前空地', '2026-05-17,2026-05-24', '报名中', NULL),
('桌游之夜', '刘同学', '狼人杀、阿瓦隆、剧本杀，欢迎自带桌游。提供场地和饮料。', '社交', 8, 6, '远明辉商场3楼休闲区', '2026-05-18,2026-05-25', '报名中', NULL);

-- 班车测试数据（未来几天）
INSERT INTO bus_schedules (direction, depart_date, depart_time, arrive_time, max_seats, booked_seats, price, from_location, to_location, status) VALUES
('去程', '2026-04-19', '14:00', '14:30', 30, 18, 5.00, '国科大西区食堂门口', '商业街十字街口', '可预约'),
('返程', '2026-04-19', '21:00', '21:30', 30, 25, 5.00, '商业街十字街口', '国科大西区食堂门口', '可预约'),
('去程', '2026-04-20', '10:00', '10:30', 30, 30, 5.00, '国科大西区食堂门口', '商业街十字街口', '已满'),
('返程', '2026-04-20', '18:00', '18:30', 30, 5, 5.00, '商业街十字街口', '国科大西区食堂门口', '可预约'),
('去程', '2026-04-26', '14:00', '14:30', 30, 12, 5.00, '国科大西区食堂门口', '商业街十字街口', '可预约'),
('返程', '2026-04-26', '21:00', '21:30', 30, 8, 5.00, '商业街十字街口', '国科大西区食堂门口', '可预约');

-- 反馈测试数据
INSERT INTO feedbacks (user_type, user_name, category, title, content, status, official_reply, is_public, upvotes) VALUES
('青年', '张同学', '交通', '希望增加下午班次', '下午2点的班车经常满员，希望能加开3点的一班', '已回复', '已记录需求，下周末将根据预约情况增开班次', TRUE, 23),
('商家', '李老板', '设施', '希望增加路灯照明', '晚上8点后街道比较暗，影响顾客停留', '处理中', NULL, TRUE, 15),
('居民', '王阿姨', '业态', '希望保留传统早餐店', '改造后担心吃不到老味道的油条豆浆了', '待处理', NULL, TRUE, 8),
('青年', '赵同学', '环境', '增加垃圾桶数量', '周末人多了垃圾没地方扔', '待处理', NULL, TRUE, 5),
('商家', '陈店主', '管理', '规范停车管理', '电动车乱停影响店铺生意', '处理中', NULL, TRUE, 12);

-- 活动报名测试数据
INSERT INTO activity_signups (activity_id, user_name, user_phone, status) VALUES
(1, '张同学', '13800138001', '已报名'),
(1, '李同学', '13800138002', '已报名'),
(1, '王博士', '13800138003', '已报名'),
(2, '陈同学', '13800138004', '已报名'),
(2, '刘同学', '13800138005', '已报名');

-- 班车预约测试数据
INSERT INTO bus_bookings (schedule_id, user_name, phone, status, checkin_code, pay_status) VALUES
(1, '张同学', '13800138001', '已预约', '1234', '待支付'),
(1, '李同学', '13800138002', '已预约', '5678', '待支付'),
(3, '王博士', '13800138003', '已预约', '9012', '已支付');
