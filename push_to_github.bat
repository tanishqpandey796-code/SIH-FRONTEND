@echo off
title Push Sahakar Gig Platform to GitHub
color 0A
echo ====================================================================
echo   SAHAKAR GIG PLATFORM - GITHUB PUSH WIZARD
echo   Target: https://github.com/tanishqpandey796-code/SIH-FRONTEND.git
echo ====================================================================
echo.

set "PATH=C:\Users\DELL\.mingit\cmd;%PATH%"

echo [*] Checking git branch...
git branch

echo.
echo [*] Pushing main branch to GitHub...
echo.
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================================================
    echo   SUCCESS! All code has been pushed to GitHub!
    echo   View online: https://github.com/tanishqpandey796-code/SIH-FRONTEND
    echo ====================================================================
) else (
    echo.
    echo ====================================================================
    echo   NOTE: If prompted, please sign in via your browser or enter your
    echo   GitHub Personal Access Token (PAT).
    echo ====================================================================
)

echo.
pause
