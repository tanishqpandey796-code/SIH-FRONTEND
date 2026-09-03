@echo off
echo ====================================================================
echo  Pushing Sahakar Gig Platform to GitHub
echo  Repository: https://github.com/tanishqpandey796-code/SIH-FRONTEND.git
echo ====================================================================
echo.

set PATH=C:\Users\DELL\.mingit\cmd;%PATH%

git status
echo.
echo Pushing main branch...
git push -u origin main

echo.
echo ====================================================================
echo  Process completed!
echo ====================================================================
pause
