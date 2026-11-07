@echo off
setlocal
chcp 65001 >nul
node "%~dp0scripts\publish-blog.mjs"
set "publish_exit=%errorlevel%"
echo.
pause
exit /b %publish_exit%
