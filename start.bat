@echo off
chcp 65001 >nul
echo ==========================================
echo    龙山青年共创实验室 - 启动脚本
echo ==========================================
echo.

echo [1/3] 正在检查 MySQL 服务...
mysql -u root -proot123 -e "SELECT 1;" >nul 2>&1
if errorlevel 1 (
    echo [错误] MySQL 未启动或密码不正确！
    echo 请确保：
    echo   1. MySQL 服务已启动
    echo   2. root 密码为 root123
    pause
    exit /b 1
)
echo [✓] MySQL 连接正常
echo.

echo [2/3] 正在初始化数据库...
mysql -u root -proot123 longshan_db < database\init_clean.sql >nul 2>&1
if errorlevel 1 (
    echo [警告] 数据库初始化可能已执行过，跳过
) else (
    echo [✓] 数据库初始化完成
)
echo.

echo [3/3] 正在启动服务...
echo.
echo 后端服务将在 http://localhost:8081 启动
echo 前端服务将在 http://localhost:3000 启动
echo.
echo 请稍候，服务启动中...
echo.

start "后端服务" cmd /k "cd backend && mvn spring-boot:run"
timeout /t 15 /nobreak >nul

start "前端服务" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo ==========================================
echo    服务启动完成！
echo ==========================================
echo.
echo 请在浏览器访问：http://localhost:3000
echo.
echo [注意] 不要关闭弹出的命令窗口！
echo.
pause
