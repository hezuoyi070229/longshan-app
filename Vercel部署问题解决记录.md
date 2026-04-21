# Vercel 部署问题解决记录

## 项目信息
- **项目名称**: longshan-app
- **部署平台**: Vercel
- **前端框架**: React + Vite
- **仓库**: hezuoyi070229/longshan-app

## 问题概述
在将 longshan-app 部署到 Vercel 时遇到了多个构建错误，最终通过调整 package.json 中的构建脚本解决了权限问题。

---

## 遇到的问题及解决方案

### 问题 1: 构建命令权限错误 (Exit Code 126)

**错误信息**:
```
sh: line 1: /vercel/path0/frontend/node_modules/.bin/vite: Permission denied
Error: Command "npm install && npm run build" exited with 126
```

**原因分析**:
- Vercel 构建环境中，`npx vite` 或 `vite` 命令执行时缺少执行权限
- 这是 Vercel 的已知问题，与 node_modules 中二进制文件的权限设置有关

**解决方案**:
修改 `frontend/package.json` 中的 build 脚本，使用 node 直接运行 vite：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "node ./node_modules/vite/bin/vite.js build",
    "preview": "vite preview"
  }
}
```

**关键修改**:
- 从 `"build": "npx vite build"` 改为 `"build": "node ./node_modules/vite/bin/vite.js build"`
- 直接使用 node 运行 vite 的 JavaScript 文件，绕过权限限制

---

### 问题 2: 未验证提交导致构建取消

**错误信息**:
```
Build Canceled
The Deployment was canceled because it was created with an unverified commit
```

**原因分析**:
- Vercel 项目设置中开启了 "Require Verified Commits"（要求验证提交）
- 提交的 commit 没有使用 GPG 签名验证

**解决方案**:
1. 进入 Vercel 项目设置 → Git
2. 找到 "Require Verified Commits" 选项
3. 关闭该开关（Disabled）
4. 保存设置后重新部署

---

### 问题 3: Root Directory 配置

**配置要点**:
- **Root Directory**: 设置为 `frontend`（因为前端代码在 frontend 文件夹中）
- **Framework Preset**: Vite
- **Build Command**: `npm run build`（使用 package.json 中定义的命令）
- **Output Directory**: `dist`

**配置路径**:
Vercel Console → Project Settings → Build and Deployment

---

## 正确的项目结构

```
longshan-app/
├── frontend/                 # 前端代码目录
│   ├── package.json         # 前端依赖和脚本
│   ├── vite.config.js       # Vite 配置
│   ├── vercel.json          # Vercel 前端配置（可选）
│   ├── dist/                # 构建输出目录
│   └── src/                 # 源代码
├── backend/                 # 后端代码（Java Spring Boot）
├── vercel.json              # 根目录 Vercel 配置
└── package.json             # 根目录 package.json（用于 Vercel 构建）
```

---

## 关键配置文件

### 1. frontend/package.json（关键修复）

```json
{
  "name": "longshan-frontend",
  "version": "1.0.1",
  "private": true,
  "type": "module",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "antd": "^5.12.0",
    "axios": "^1.6.2",
    "dayjs": "^1.11.10"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "node ./node_modules/vite/bin/vite.js build",
    "preview": "vite preview"
  }
}
```

**重要**: 使用 `node ./node_modules/vite/bin/vite.js build` 而不是 `npx vite build`

### 2. 根目录 vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "frontend/dist",
  "framework": null,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

### 3. 根目录 package.json

```json
{
  "name": "longshan-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "cd frontend && npm install && npm run build"
  }
}
```

---

## 部署检查清单

在部署前，请确认以下事项：

- [ ] `frontend/package.json` 中的 build 脚本使用 node 直接运行 vite
- [ ] Vercel 项目设置的 Root Directory 为 `frontend`
- [ ] Vercel Git 设置中 "Require Verified Commits" 已关闭
- [ ] 代码已推送到 GitHub main 分支
- [ ] 如需清除缓存，在 Redeploy 时取消勾选 "Use existing Build Cache"

---

## 常见错误代码

| 错误代码 | 含义 | 解决方案 |
|---------|------|---------|
| 126 | 权限错误 | 修改 build 脚本，使用 node 直接运行 |
| 1 | 一般构建错误 | 检查代码语法和依赖 |
| 128 | Git 相关错误 | 检查仓库连接和分支设置 |

---

## 参考链接

- [Vercel Build Error Documentation](https://vercel.com/docs/errors)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Node.js Permission Issues on Vercel](https://vercel.com/support/articles/node-modules-bin-permission-denied)

---

## 记录日期
2025-01-21

## 记录人
AI Assistant
