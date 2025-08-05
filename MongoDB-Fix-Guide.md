# MongoDB Atlas Setup Guide

## Quick Fix Steps:

### Step 1: Fix IP Whitelist
1. Go to https://cloud.mongodb.com/
2. Login to your MongoDB Atlas account
3. Select your project "dabbaCaartel"
4. Click "Network Access" in left sidebar
5. Click "Add IP Address"
6. Select "Allow Access from Anywhere" (0.0.0.0/0)
7. Click "Confirm"

### Step 2: Alternative - Create New Cluster
If the current cluster has issues:

1. Go to MongoDB Atlas Dashboard
2. Click "Create" → "Cluster"
3. Choose "FREE" M0 cluster
4. Select a region close to you
5. Name it "dabba-cartel-new"
6. Click "Create Cluster"

### Step 3: Get New Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "4.1 or later"
4. Copy the connection string
5. Replace `<password>` with your actual password

### Step 4: Update server.js
Replace the connection string in your server.js file.

## Alternative: Use Local MongoDB
If Atlas continues to have issues, you can install MongoDB locally:

1. Download MongoDB Community Server
2. Install and start MongoDB service
3. Update connection string to: `mongodb://localhost:27017/dabbaCaartel`

## Network Issues
If you're on a corporate/restricted network:
- Try using mobile hotspot temporarily
- Contact network admin about MongoDB Atlas access
- Use a VPN if allowed
