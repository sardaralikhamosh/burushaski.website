@echo off
echo ========================================
echo Burushaski Website Deployment Script
echo ========================================
echo.

echo 1. Checking Git status...
git status

echo.
echo 2. Adding changes to Git...
git add .

echo.
echo 3. Committing changes...
set /p commit_msg="Enter commit message: "
git commit -m "%commit_msg%"

echo.
echo 4. Pushing to GitHub...
git push origin main

echo.
echo 5. Deployment complete!
echo.
echo Next steps:
echo 1. Login to Hostinger hPanel
echo 2. Open File Manager
echo 3. Navigate to public_html/keyboard
echo 4. Delete all existing files
echo 5. Upload all files from local keyboard/ folder
echo 6. Test at https://burushaski.website/keyboard
echo.
pause