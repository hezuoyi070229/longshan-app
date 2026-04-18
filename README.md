# 龙山青年共创实验室

为北京市怀柔区龙山街道商业街打造的青年共创平台，解决"老城服务新城"难题。通过数字化手段吸引国科大等青年群体，激活老城商业空间，形成可持续的青年生态。

## 项目概述

### 核心定位
**"不等政府改造，青年先用起来"**——用轻资产、快启动的方式，让青年先活起来，用人气带动政府调整规划。

### 三大核心板块

| 板块 | 功能 | 解决痛点 |
|:---|:---|:---|
| **文化活动平台** | 用户发起活动→平台统计"想参加"人数→满员后排期→周末固定地点举办 | 青年社交需求、老城人气不足 |
| **反馈平台** | 青年/商户向政府提意见→公开透明→政府回复 | 治理参与、诉求表达 |
| **交通平台** | 固定班车往返国科大与商业街 | 交通不便、降低到访门槛 |

## 技术栈

- **前端**：React 18 + Ant Design 5 + Vite
- **后端**：Spring Boot 3 + MyBatis-Plus
- **数据库**：MySQL 8.0

## 项目结构

```
longshan-app/
├── backend/                 # 后端 Spring Boot 项目
│   ├── src/main/java/com/longshan/
│   │   ├── LongshanApplication.java
│   │   ├── config/         # 配置类
│   │   ├── controller/     # API 控制器
│   │   ├── entity/         # 数据库实体
│   │   ├── mapper/         # MyBatis Mapper
│   │   ├── service/        # 业务逻辑
│   │   └── common/         # 通用类
│   ├── src/main/resources/
│   │   └── application.yml # 配置文件
│   └── pom.xml
├── frontend/               # 前端 React 项目
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   │   ├── Home.jsx
│   │   │   ├── Activities/
│   │   │   ├── Bus/
│   │   │   ├── Feedback/
│   │   │   └── Profile.jsx
│   │   ├── services/      # API 请求
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── database/
    └── init.sql           # 数据库初始化脚本
```

## 快速开始

### 1. 数据库准备

```bash
# 登录 MySQL
mysql -u root -p

# 执行初始化脚本
source database/init.sql
```

### 2. 启动后端服务

```bash
cd backend

# 使用 Maven 运行
mvn spring-boot:run

# 或使用 IDEA 打开项目运行
```

后端服务将在 http://localhost:8080 启动

### 3. 启动前端服务

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端服务将在 http://localhost:3000 启动

## API 接口

### 活动模块

| 方法 | 路径 | 功能 |
|:---|:---|:---|
| GET | `/api/activities` | 获取活动列表 |
| GET | `/api/activities/{id}` | 获取活动详情 |
| POST | `/api/activities` | 创建活动 |
| POST | `/api/activities/{id}/signup` | 报名参加 |

### 班车模块

| 方法 | 路径 | 功能 |
|:---|:---|:---|
| GET | `/api/bus/schedules` | 获取班次列表 |
| POST | `/api/bus/book` | 预约座位 |
| GET | `/api/bus/bookings` | 我的预约 |

### 反馈模块

| 方法 | 路径 | 功能 |
|:---|:---|:---|
| GET | `/api/feedbacks` | 获取反馈列表 |
| POST | `/api/feedbacks` | 提交反馈 |
| POST | `/api/feedbacks/{id}/upvote` | 点赞 |

## 核心业务逻辑

### 活动排期逻辑
1. 用户点击"我想参加"
2. 当前报名人数 +1
3. 如果 >= 最低成行人数且状态为"报名中":
   - 状态改为"已排期"
   - 设置第一个建议日期为排期日期

### 班车预约逻辑
1. 查询班次剩余座位
2. 如果已满，返回失败
3. 已预约座位 +1
4. 生成随机验证码
5. 返回预约成功

### 反馈点赞逻辑
1. 点赞数 +1
2. 如果点赞数 >= 20，设置较高优先级

## 开发团队

项目技术负责人：同学F（软件工程）

- 负责：后端API + 前端框架搭建 + 联调
- 配合需求：同学A（调研数据）、同学C（文案）、同学D（积分规则）、同学E（机制设计）

## 许可证

MIT License
