# GitHub Pages Deployment Guide

## 📋 Prerequisites

1. GitHub account
2. Repository created (e.g., `https://github.com/ozosi/Attendance`)

## 🚀 Deployment Steps

### 1. Update Repository Name in vite.config.js

If your GitHub repository name is different from "Attendance", update the `base` path:

```javascript
// vite.config.js
export default defineConfig({
  base: '/YourRepoName/', // Change this to match your repo name
  // ... rest of config
});
```

### 2. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Attendance Management System"

# Add remote repository
git remote add origin https://github.com/ozosi/Attendance.git

# Push to main branch
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. The deployment will start automatically

### 4. Wait for Deployment

- GitHub Actions will build and deploy your app
- Check progress in the **Actions** tab
- Usually takes 2-3 minutes

### 5. Access Your App

Once deployed, your app will be available at:
```
https://ozosi.github.io/Attendance/
```

## 🔄 Updating Your App

After making changes:

```bash
# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to trigger automatic deployment
git push
```

The GitHub Action will automatically rebuild and redeploy.

## 🛠️ Manual Build (Optional)

To test the production build locally:

```bash
# Build
npm run build

# Preview
npm run preview
```

Then open `http://localhost:4173/Attendance/`

## ✅ What's Configured

- ✅ Vite config with correct base path
- ✅ GitHub Actions workflow for automatic deployment
- ✅ Production build optimized
- ✅ README with demo link
- ✅ .gitignore for clean repository

## 🐛 Troubleshooting

### Issue: 404 on GitHub Pages
- Check that `base` in `vite.config.js` matches your repo name exactly
- Ensure it starts and ends with `/`

### Issue: Blank page
- Check browser console for errors
- Verify all image paths are correct
- Make sure `ZOE.png` is in the `public` folder

### Issue: Workflow fails
- Check the Actions tab for error details
- Ensure `package.json` has all required dependencies
- Verify Node version compatibility

## 📁 Important Files

- `vite.config.js` - Vite configuration with base path
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `package.json` - Dependencies and build scripts
- `.gitignore` - Files to exclude from git

## 🎉 Success!

Your app is now live and will auto-deploy on every push to main!
