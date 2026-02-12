# Recipe Room - Frontend

React + Vite frontend application for Recipe Room.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your backend URL
# VITE_API_BASE_URL=http://localhost:8000/api

# Start development server
npm run dev
```

Frontend will run on http://localhost:5173

## 📖 Documentation

See main project documentation:
- [DEVELOPMENT.md](../DEVELOPMENT.md) - Local development setup
- [DEPLOYMENT.md](../DEPLOYMENT.md) - Production deployment

## 🔧 Configuration

Edit `.env` file:
```bash
VITE_API_BASE_URL=http://localhost:8000/api  # Backend URL
VITE_ENV=development
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/      # Reusable components
├── pages/          # Page components
├── services/       # API services
├── store/          # Redux store
├── config/
│   └── api.config.js  # Centralized API configuration
├── hooks/          # Custom React hooks
└── assets/         # Static assets
```

## 🔗 API Integration

All API calls use the centralized configuration in `src/config/api.config.js`.

Import and use:
```javascript
import { API_BASE_URL, API_ENDPOINTS } from '../config/api.config';
```

## 🧪 Testing

Make sure backend is running on http://localhost:8000

Test the connection:
1. Start frontend
2. Open browser DevTools → Console
3. Check for any CORS errors
4. Test login/registration

## 🚀 Production Build

```bash
npm run build
```

Output will be in `dist/` directory.

Test production build locally:
```bash
npm run preview
```

## 📦 Tech Stack

- **Framework:** React 18+
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Routing:** React Router

## 🔐 Environment Variables

Required variables:
- `VITE_API_BASE_URL` - Backend API URL

Optional variables:
- `VITE_PAYD_PUBLIC_KEY` - PayD payment gateway key

## 🤝 Contributing

See main [README.md](../README.md) for contribution guidelines.

## 📞 Support

For issues:
1. Check backend is running
2. Verify `.env` configuration
3. Check browser console for errors
4. Review network tab in DevTools
