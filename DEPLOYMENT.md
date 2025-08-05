# Dabba Cartel - Deployment Guide 🍱

Your tiffin tracking application is ready for deployment! Here are several options:

## Option 1: Deploy to Vercel (Recommended - Free)

### Step 1: Deploy Backend to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Backend:**
   ```bash
   cd Backend
   vercel login
   vercel --prod
   ```
   - Follow the prompts
   - Choose a project name (e.g., "dabba-cartel-backend")
   - Copy the deployment URL (e.g., https://dabba-cartel-backend.vercel.app)

### Step 2: Deploy Frontend to Vercel

1. **Update environment variables:**
   - Edit `Frontend/.env.production`
   - Replace `https://your-backend-url.vercel.app` with your actual backend URL

2. **Deploy Frontend:**
   ```bash
   cd Frontend
   vercel --prod
   ```
   - Choose a project name (e.g., "dabba-cartel")
   - Your app will be live at the provided URL

---

## Option 2: Deploy to Netlify + Railway

### Backend (Railway)

1. **Go to [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Deploy the Backend folder**
4. **Add environment variables:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000

### Frontend (Netlify)

1. **Go to [Netlify.com](https://netlify.com)**
2. **Drag and drop your `Frontend/build` folder**
3. **Build your React app first:**
   ```bash
   cd Frontend
   npm run build
   ```

---

## Option 3: Deploy to Heroku (Free Tier Discontinued)

### Backend

1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   cd Backend
   heroku create dabba-cartel-backend
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

### Frontend

1. **Build and deploy:**
   ```bash
   cd Frontend
   npm run build
   # Deploy build folder to Netlify or Vercel
   ```

---

## Quick Start Commands

### For Vercel Deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy Backend
cd Backend
vercel login
vercel --prod

# Note the backend URL, then update Frontend/.env.production

# Deploy Frontend
cd ../Frontend
vercel --prod
```

---

## Environment Variables Setup

### Backend Environment Variables:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `PORT`: 5000 (or any port)

### Frontend Environment Variables:
- `REACT_APP_API_URL`: Your backend deployment URL

---

## Before Deployment Checklist:

✅ MongoDB Atlas cluster is running
✅ Backend server.js has proper CORS configuration
✅ Frontend API calls use environment variables
✅ Environment variables are set correctly
✅ Both frontend and backend build successfully

---

## Testing Your Deployment:

1. **Backend Test:**
   - Visit: `https://your-backend-url.vercel.app/api/stats`
   - Should return JSON data

2. **Frontend Test:**
   - Visit your frontend URL
   - Try adding a tiffin entry
   - Check all views (List, Calendar, Dashboard)

---

## Troubleshooting:

### Common Issues:

1. **CORS Errors:**
   - Add your frontend domain to CORS origins in server.js

2. **MongoDB Connection:**
   - Verify MONGODB_URI environment variable
   - Check MongoDB Atlas IP whitelist (use 0.0.0.0/0 for all IPs)

3. **API Not Found:**
   - Verify REACT_APP_API_URL in frontend
   - Check backend deployment status

### Backend CORS Update (if needed):
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.vercel.app'
  ]
}));
```

---

## Next Steps After Deployment:

1. **Custom Domain (Optional):**
   - Both Vercel and Netlify support custom domains
   - Add your domain in the platform settings

2. **SSL Certificate:**
   - Automatically provided by Vercel/Netlify

3. **Monitoring:**
   - Use Vercel Analytics or Netlify Analytics
   - Monitor MongoDB Atlas usage

---

## Cost Breakdown:

- **Vercel:** Free for personal projects
- **Netlify:** Free for personal projects  
- **MongoDB Atlas:** Free tier (512MB storage)
- **Total Cost:** FREE! 🎉

---

## Support:

If you face any issues during deployment:
1. Check the deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check MongoDB Atlas connection

Happy Deploying! 🚀
