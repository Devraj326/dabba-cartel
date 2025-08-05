@echo off
echo 🍱 Dabba Cartel Deployment Script
echo ==================================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

echo.
echo Step 1: Deploying Backend...
echo ----------------------------
cd Backend
echo 📁 Current directory: %cd%
echo 🚀 Deploying backend to Vercel...
vercel --prod

echo.
echo ⚠️  IMPORTANT: Copy the backend URL from above!
echo 📝 Update Frontend\.env.production with your backend URL
echo.
pause

echo.
echo Step 2: Deploying Frontend...
echo -----------------------------
cd ..\Frontend
echo 📁 Current directory: %cd%
echo 🚀 Deploying frontend to Vercel...
vercel --prod

echo.
echo 🎉 Deployment Complete!
echo =======================
echo ✅ Your Dabba Cartel app should now be live!
echo 📱 Test all features: Add entries, Calendar view, Dashboard
echo 🔧 If there are issues, check the DEPLOYMENT.md guide
pause
