# 龙山青年共创实验室

<<<<<<< HEAD
> 一个面向国科大学生的活动管理、班车预约和反馈收集平台。

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=flat&logo=vercel)](https://longshan-app.vercel.app)
[![Railway](https://img.shields.io/badge/Backend-Railway-0B0D0E?style=flat&logo=railway)](https://railway.app)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://reactjs.org/)

## 🌐 在线访问

**网站地址**：https://longshan-app.vercel.app

**支持平台**：
- ✅ 电脑浏览器
- ✅ 手机浏览器
- ✅ 平板设备

**无需安装**：直接浏览器访问即可使用

---

## 📋 项目简介

龙山青年共创实验室是一个为中科院大学学生打造的校园生活服务平台，提供以下核心功能：

### 核心功能

| 功能模块 | 描述 | 状态 |
|---------|------|------|
| 🎉 活动管理 | 查看活动、报名参与、发起活动 | ✅ 已完成 |
| 🚌 班车预约 | 查看班车时刻表、在线预约、签到乘车 | ✅ 已完成 |
| 💬 反馈建议 | 提交反馈、查看回复、点赞互动 | ✅ 已完成 |
| 👤 个人中心 | 管理报名、预约、反馈记录 | ✅ 已完成 |

---

## 🏗️ 技术架构

### 前端技术栈
- **框架**：React 18
- **UI 组件库**：Ant Design 5
- **构建工具**：Vite
- **HTTP 客户端**：Axios
- **部署平台**：Vercel

### 后端技术栈
- **框架**：Spring Boot 3
- **ORM 框架**：MyBatis-Plus
- **数据库**：MySQL 8.0
- **部署平台**：Railway

### 系统架构
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   用户浏览器     │────▶│   Vercel CDN    │────▶│  Railway 后端   │
│  (React 前端)   │     │  (静态资源托管)  │     │ (Spring Boot)  │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │  Railway MySQL  │
                                                │   (数据存储)     │
                                                └─────────────────┘
```

---

## 🚀 快速开始

### 环境要求
- Node.js 16+（前端开发）
- Java 17+（后端开发）
- Maven 3.8+（后端构建）
- MySQL 8.0（本地数据库）

### 本地开发

#### 1. 克隆仓库
```bash
git clone https://github.com/hezuoyi070229/longshan-app.git
cd longshan-app
```

#### 2. 启动后端服务
```bash
cd backend

# 配置数据库（修改 application.yml）
# 运行项目
mvn spring-boot:run

# 后端服务运行在 http://localhost:8080
```

#### 3. 启动前端服务
=======
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

>>>>>>> 12a1762a67e6cbb2b3cf8398d2cd3144f3047af4
```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
<<<<<<< HEAD

# 前端服务运行在 http://localhost:3000
```

#### 4. 访问应用
打开浏览器访问 http://localhost:3000

---

## 📁 项目结构

```
longshan-app/
├── backend/                    # 后端项目
│   ├── src/
│   │   └── main/
│   │       ├── java/com/longshan/
│   │       │   ├── config/     # 配置类
│   │       │   ├── controller/ # 控制器
│   │       │   ├── entity/     # 实体类
│   │       │   ├── mapper/     # 数据访问层
│   │       │   ├── service/    # 业务逻辑层
│   │       │   └── LongshanApplication.java
│   │       └── resources/
│   │           ├── application.yml  # 配置文件
│   │           └── mapper/     # MyBatis 映射文件
│   └── pom.xml
├── frontend/                   # 前端项目
│   ├── src/
│   │   ├── components/         # 公共组件
│   │   ├── pages/              # 页面组件
│   │   ├── services/           # API 服务
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── database/                   # 数据库脚本
│   └── init.sql               # 初始化脚本
└── README.md
```

---

## 📊 数据库设计

### 实体关系图
```
┌─────────────┐       ┌─────────────────┐
│  activities │◄──────┤ activity_signups │
│   (活动表)   │ 1:N   │   (活动报名表)    │
└─────────────┘       └─────────────────┘

┌─────────────────┐   ┌─────────────────┐
│  bus_schedules  │◄──┤  bus_bookings   │
│   (班车班次表)   │1:N│   (班车预约表)   │
└─────────────────┘   └─────────────────┘

┌─────────────┐
│  feedbacks  │
│  (反馈表)   │
└─────────────┘
```

### 数据表说明

| 表名 | 说明 | 主要字段 |
|------|------|----------|
| activities | 活动信息表 | title, description, scheduled_date, status |
| activity_signups | 活动报名表 | activity_id, user_name, phone, status |
| bus_schedules | 班车班次表 | direction, depart_date, depart_time, max_seats |
| bus_bookings | 班车预约表 | schedule_id, user_name, checkin_code, status |
| feedbacks | 反馈建议表 | category, title, content, status, official_reply |

---

## 🔧 部署说明

### 生产环境部署

项目已配置自动化部署，推送代码到 GitHub 后自动部署：

1. **前端部署（Vercel）**
   - 连接 GitHub 仓库
   - 自动检测 frontend 目录
   - 自动构建并部署

2. **后端部署（Railway）**
   - 连接 GitHub 仓库
   - 自动检测 backend 目录
   - 自动构建并部署

3. **数据库（Railway MySQL）**
   - 自动创建和管理
   - 自动备份

### 环境变量配置

#### 前端环境变量（Vercel）
```env
VITE_API_URL=https://your-backend-url.up.railway.app/api
```

#### 后端环境变量（Railway）
```env
DATABASE_URL=jdbc:mysql://host:port/database?useUnicode=true&characterEncoding=utf-8
MYSQLHOST=your-mysql-host
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=your-password
MYSQL_DATABASE=railway
```

---

## 📖 使用文档

- [网站使用指南-同学版](./网站使用指南-同学版.md) - 面向普通用户的使用说明
- [网站维护文档-管理员版](./网站维护文档-管理员版.md) - 面向管理员的技术文档

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交 Issue
- 描述清楚问题
- 提供复现步骤
- 附上错误截图或日志

### 提交代码
1. Fork 本仓库
2. 创建 Feature Branch (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到 Branch (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目仅供学习和研究使用。

---

## 👥 团队成员

- **项目负责人**：hezuoyi070229
- **开发团队**：Challenge Cup 项目组

---

## 🙏 致谢

- 中国科学院大学
- 挑战杯竞赛组委会
- 所有参与测试和反馈的同学

---

## 📞 联系我们

如有问题或建议，欢迎通过以下方式联系：

- 在反馈模块提交建议
- GitHub Issues: https://github.com/hezuoyi070229/longshan-app/issues
- 项目邮箱：[你的邮箱]

---

<p align="center">
  <strong>龙山青年共创实验室</strong><br>
  Created for Challenge Cup 2026
</p>
=======
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
>>>>>>> 12a1762a67e6cbb2b3cf8398d2cd3144f3047af4
