# Version Update Guide

## How to Force App Updates on iOS Home Screen

When you make changes to the app and deploy them, you need to update the version number in **two places** to force iOS home screen apps to reload:

### 1. Update the Meta Tag (line ~12)
```html
<meta name="app-version" content="2.0.0">
```

### 2. Update the JavaScript Constant (line ~656)
```javascript
const APP_VERSION = '2.0.0';
```

### Version Numbering
- Use semantic versioning: `MAJOR.MINOR.PATCH`
- Examples: `2.0.0`, `2.0.1`, `2.1.0`, `3.0.0`
- Increment the patch number (e.g., `2.0.0` → `2.0.1`) for small updates
- Increment minor (e.g., `2.0.0` → `2.1.0`) for new features
- Increment major (e.g., `2.0.0` → `3.0.0`) for breaking changes

### How It Works
- The app checks for updates every 2 minutes when running from home screen
- When a new version is detected, it automatically reloads
- Users can also manually trigger an update using the "Force Update" button

### Quick Update Checklist
1. ✅ Make your code changes
2. ✅ Update version in meta tag (line ~12)
3. ✅ Update version in JavaScript (line ~656)
4. ✅ Commit and push to GitHub
5. ✅ Deploy to your hosting service

The iOS home screen app will automatically detect and load the new version!
