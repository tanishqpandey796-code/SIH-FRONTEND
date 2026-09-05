@echo off
echo ===================================================
echo   Starting Sahakar Gig Platform on Localhost...
echo ===================================================
echo.
echo Server running at http://localhost:3000
echo Press Ctrl+C in this window to stop the server.
echo.

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    start http://localhost:3000
    python -m http.server 3000
    goto :eof
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    start http://localhost:3000
    py -m http.server 3000
    goto :eof
)

where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    start http://localhost:3000
    node server.js
    goto :eof
)

echo [ERROR] Neither Python nor Node.js was found in PATH!
echo Please install Python or Node.js to run the local server.
pause
