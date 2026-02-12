# Quick Start Guide - Recipe Room Fixed Integration

## ✅ What's Fixed

Your frontend and backend are now fully connected! All buttons that "did nothing" now work properly.

---

## 🚀 How to Use

### 1. Make Sure Both Servers Are Running

**Backend (Port 8000):**
```bash
cd /home/alex/final/Recipe-room-backend
source venv/bin/activate
python app.py
```

**Frontend (Port 5173):**
```bash
cd /home/alex/final/Recipe-room-backend/Recipe-room-frontend
npm run dev
```

---

### 2. Features That Now Work

#### ✅ Create a Group
1. Go to Groups page
2. Click "+ Create Group"
3. Fill in:
   - Group name (required)
   - Description (optional)
   - Max members (default: 10)
4. Click "Create"
5. **Your group is saved to the database!**

#### ✅ Create a Recipe
1. Go to Create Recipe page
2. Fill in ALL required fields:
   - **Title** (required)
   - **Country** (optional)
   - **Servings** (required, number)
   - **Prep Time** in minutes (optional)
   - **Cook Time** in minutes (optional)
   - **Ingredients** (required, at least 1):
     - Name (e.g., "Flour")
     - Quantity (e.g., "2 cups")
     - Notes (optional)
   - **Instructions** (required, at least 1 step)
3. Click "Create Recipe"
4. **Recipe is saved and you're redirected!**

#### ✅ Invite Members to Group
1. Open any group
2. Click "+ Invite Members"
3. Enter the user ID of the person to invite
   - To get user IDs: Check browser console after login
   - Or run diagnostic test to see test user IDs
4. Click "Invite"
5. **Member is added to the group!**

#### ✅ Add Recipe to Group
1. Create some recipes first
2. Open a group
3. Click "+ Add Recipe to Group"
4. Select a recipe from the list
5. Click "Add Recipe"
6. **Recipe appears in the group!**

---

## 🧪 Testing

### Run Backend Diagnostic
```bash
cd /home/alex/final/Recipe-room-backend
source venv/bin/activate
python diagnostic_test.py
```

This creates test users and tests all endpoints automatically.

---

## ⚠️ Important Notes

### Authentication Required
- You must be logged in to:
  - Create recipes
  - Create groups
  - Invite members
  - Add recipes to groups

### User IDs for Inviting Members
- Currently you need to know the user ID number
- Future improvement: Search by username/email

### Data Format
- **Prep/Cook time**: Enter numbers only (in minutes)
- **Servings**: Must be a number (1-1000)
- **Ingredients**: Each must have name AND quantity
- **Steps**: Each must have instructions

---

## 📁 What Changed

### New Files Created:
1. `src/services/groupService.js` - Group API calls
2. `src/services/recipeService.js` - Recipe API calls

### Files Updated:
1. `src/pages/Groups.jsx` - Now fetches real data
2. `src/pages/CreateRecipe.jsx` - Sends correct data format
3. `src/pages/GroupDetail.jsx` - All buttons work now

---

## 🐛 Troubleshooting

### "Cannot create recipe"
- Check browser console for errors
- Make sure all required fields are filled
- Ingredients need both name AND quantity
- At least one instruction step required

### "Cannot invite member"
- User ID must exist in database
- Run diagnostic test to create test users
- Or register new users first

### "401 Unauthorized"
- You need to log in first
- Check if JWT token is in localStorage
- Try logging in again

### CORS Errors
- Make sure frontend runs on http://localhost:5173
- Backend must be on http://localhost:8000

---

## 🎯 Next Steps

Your app is now fully functional! Consider:

1. **Configure Cloudinary** for image uploads (currently optional)
2. **Add user search** for easier member invitations
3. **Add toast notifications** instead of alerts
4. **Add loading indicators** for better UX

---

## 📞 Need Help?

Check the detailed documentation:
- **Full Fix Summary**: `/home/alex/final/Recipe-room-backend/FRONTEND_BACKEND_INTEGRATION_FIX.md`
- **API Documentation**: `/home/alex/final/Recipe-room-backend/API_DOCUMENTATION.md`

**Status: ✅ Everything is working!**
