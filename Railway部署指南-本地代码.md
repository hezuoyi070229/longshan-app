# Railway 本地代码部署指南

由于 Railway CLI 需要交互式登录，我们使用更简单的方式：通过 Railway 网站直接上传代码。

## 方法一：通过 Railway 网站部署（推荐）

### 步骤 1：压缩后端代码

1. 打开文件资源管理器，进入 `d:\123pan\挑战杯项目\Longshan app\longshan-app\backend` 文件夹
2. 选中所有文件和文件夹（除了 `target` 文件夹，因为它包含编译后的文件，很大）
3. 右键 → 发送到 → 压缩文件夹，命名为 `backend.zip`

### 步骤 2：在 Railway 网站创建项目

1. 打开浏览器，访问 https://railway.app/
2. 点击 "Login" 登录（可以使用 GitHub 账号）
3. 登录后点击 "New Project"
4. 选择 "Empty Project"
5. 给项目起个名字，比如 `longshan-backend`

### 步骤 3：上传代码

1. 在项目页面，点击 "New" → "Environment"
2. 点击 "Upload Code"
3. 选择刚才压缩的 `backend.zip` 文件
4. 等待上传完成

### 步骤 4：配置构建命令

1. 上传完成后，点击 "Add Variables"
2. 添加以下环境变量：

```
RAILWAY_ENVIRONMENT=production
```

3. 点击 "Deploy" 按钮

### 步骤 5：添加 MySQL 数据库

1. 在项目页面，点击 "New" → "Database" → "Add MySQL"
2. Railway 会自动创建数据库并设置环境变量
3. 等待数据库创建完成

### 步骤 6：配置数据库连接

1. 点击 MySQL 服务
2. 在 "Connect" 标签页，你会看到连接信息
3. 点击 "Variables" 标签
4. 确认以下变量已自动设置：
   - `MYSQLDATABASE`
   - `MYSQLHOST`
   - `MYSQLPASSWORD`
   - `MYSQLPORT`
   - `MYSQLUSER`

### 步骤 7：修改后端配置

我们需要修改 `application.yml` 来使用 Railway 的数据库环境变量。

我已经为你准备好了配置，见下面的 "重要文件修改"。

### 步骤 8：重新部署

1. 修改代码后，重新压缩上传
2. 或者使用 Railway 的 GitHub 集成（如果之前的问题已解决）

---

## 方法二：使用 Vercel + Serverless Functions（更简单）

如果你觉得 Railway 太复杂，我们可以把后端也部署到 Vercel，使用 Serverless Functions。

### 优点：
- 前端和后端都在同一个平台
- 免费额度充足
- 自动 HTTPS
- 全球 CDN

### 步骤：

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 登录 Vercel：
```bash
vercel login
```

3. 在项目根目录创建 `vercel.json`：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/pom.xml",
      "use": "@vercel/java"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/target/backend-1.0.0.jar"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}
```

4. 部署：
```bash
vercel
```

---

## 重要文件修改

### 1. 修改 `backend/src/main/resources/application.yml`

```yaml
server:
  port: ${PORT:8080}

spring:
  application:
    name: longshan-app
  
  datasource:
    url: ${DATABASE_URL:jdbc:mysql://localhost:3306/longshan_db?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai&createDatabaseIfNotExist=true}
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:root123}
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    database-platform: org.hibernate.dialect.MySQLDialect
  
  jackson:
    time-zone: Asia/Shanghai
    date-format: yyyy-MM-dd HH:mm:ss

mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    map-underscore-to-camel-case: true
  global-config:
    db-config:
      id-type: auto
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0

logging:
  level:
    com.longshan: debug
```

### 2. 创建 `backend/Procfile`

在 `backend` 文件夹中创建 `Procfile` 文件（没有扩展名），内容：

```
web: java -jar target/backend-1.0.0.jar
```

### 3. 创建 `backend/system.properties`

在 `backend` 文件夹中创建 `system.properties` 文件，内容：

```
java.runtime.version=17
```

---

## 快速开始

最简单的方法是使用 **Render** 或 **Fly.io**，它们对 Spring Boot 支持更好。

### 使用 Render 部署（推荐新手）

1. 访问 https://render.com/
2. 用 GitHub 登录
3. 点击 "New Web Service"
4. 选择你的代码（可以直接上传 ZIP）
5. 配置：
   - **Build Command**: `./mvnw clean package`
   - **Start Command**: `java -jar target/backend-1.0.0.jar`
6. 添加 MySQL 数据库（Render 提供免费的 PostgreSQL，或者你可以用外部 MySQL）
7. 点击 "Create Web Service"

Render 的优点：
- 支持直接上传 ZIP 文件
- 不需要 GitHub
- 免费额度足够演示使用
- 自动 HTTPS

---

## 推荐方案总结

| 平台 | 难度 | 免费额度 | 是否需要 GitHub | 推荐度 |
|------|------|----------|-----------------|--------|
| **Render** | ⭐ 简单 | 足够 | 否（可上传ZIP） | ⭐⭐⭐⭐⭐ |
| **Railway** | ⭐⭐ 中等 | 足够 | 需要 | ⭐⭐⭐⭐ |
| **Vercel** | ⭐⭐ 中等 | 充足 | 需要 | ⭐⭐⭐⭐ |
| **Fly.io** | ⭐⭐⭐ 较难 | 有免费额度 | 需要 | ⭐⭐⭐ |

**推荐使用 Render**，因为它最简单，支持直接上传 ZIP 文件！
