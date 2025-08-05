#!/bin/bash

echo "🍱 Dabba Cartel Deployment Script"
echo "=================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo ""
echo "Step 1: Deploying Backend..."
echo "----------------------------"
cd Backend
echo "📁 Current directory: $(pwd)"
echo "🚀 Deploying backend to Vercel..."
vercel --prod

echo ""
echo "⚠️  IMPORTANT: Copy the backend URL from above!"
echo "📝 Update Frontend/.env.production with your backend URL"
echo ""
read -p "Press Enter when you've updated the frontend .env.production file..."

echo ""
echo "Step 2: Deploying Frontend..."
echo "-----------------------------"
cd ../Frontend
echo "📁 Current directory: $(pwd)"
echo "🚀 Deploying frontend to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment Complete!"
echo "======================="
echo "✅ Your Dabba Cartel app should now be live!"
echo "📱 Test all features: Add entries, Calendar view, Dashboard"
echo "🔧 If there are issues, check the DEPLOYMENT.md guide"
