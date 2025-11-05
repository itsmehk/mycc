# 🚀 Quick Start Guide

Get CardMatch Pro running locally in under 5 minutes!

## Prerequisites Check

```bash
# Check Node.js version (should be 18+)
node --version

# Check Python version (should be 3.11+)
python --version

# Check npm
npm --version
```

## Option 1: Quick Local Setup (Recommended for Development)

### Step 1: Clone & Navigate
```bash
git clone https://github.com/your-username/cardmatch-pro.git
cd cardmatch-pro
```

### Step 2: Start Backend (Terminal 1)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

✅ Backend running at http://localhost:8000

### Step 3: Start Frontend (Terminal 2)
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000" > .env.local
npm run dev
```

✅ Frontend running at http://localhost:3000

### Step 4: Test It Out!
Open http://localhost:3000 in your browser and start the quiz!

---

## Option 2: Docker Setup (Fastest)

```bash
# Clone repository
git clone https://github.com/your-username/cardmatch-pro.git
cd cardmatch-pro

# Start everything with one command
docker-compose up --build
```

✅ Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 🧪 Quick Test Commands

### Test Backend API
```bash
# Health check
curl http://localhost:8000/health

# Get questions
curl http://localhost:8000/api/v1/questions

# Get cards
curl http://localhost:8000/api/v1/cards
```

### Test Frontend
Open http://localhost:3000 and verify:
- [ ] Landing page loads with hero section
- [ ] "Start My Card Match" button works
- [ ] Quiz questions appear
- [ ] Progress bar updates
- [ ] Results page shows recommendations

---

## 🚨 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

**Module not found errors:**
```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### Frontend Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or run on different port
PORT=3001 npm run dev
```

**API connection failed:**
1. Check backend is running: http://localhost:8000/health
2. Verify .env.local has correct API URL
3. Check CORS settings in backend config

**Build errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## 📱 Quick Mobile Test

```bash
# Find your local IP
# Mac/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows:
ipconfig

# Update frontend/.env.local
NEXT_PUBLIC_API_BASE_URL=http://YOUR_IP:8000

# Access from mobile:
http://YOUR_IP:3000
```

---

## ⚡ Development Tips

### Hot Reload
Both frontend and backend support hot reload by default:
- **Frontend**: Saved changes reload automatically
- **Backend**: `--reload` flag enables auto-restart

### API Documentation
Visit http://localhost:8000/docs for interactive API testing

### Type Checking
```bash
# Frontend type check
cd frontend
npm run type-check
```

### Linting
```bash
# Frontend linting
cd frontend
npm run lint
```

---

## 🎯 Next Steps

1. **Customize Cards**: Edit `backend/app/data/cards.py`
2. **Add Questions**: Modify `backend/app/data/questions.py`
3. **Style Changes**: Update `frontend/src/styles/globals.css`
4. **Algorithm Tuning**: Adjust `backend/app/services/recommendation.py`

---

## 💡 Common Development Workflows

### Adding a New Credit Card
1. Edit `backend/app/data/cards.py`
2. Add card object with all required fields
3. Backend auto-reloads, no restart needed!

### Modifying UI Components
1. Edit components in `frontend/src/components/`
2. Save file → instant hot reload
3. Check browser for changes

### Testing API Changes
1. Modify endpoint in `backend/app/api/v1/endpoints/`
2. Visit http://localhost:8000/docs
3. Test directly in Swagger UI

---

## 🎓 Learning Resources

- **Next.js 14**: https://nextjs.org/docs
- **FastAPI**: https://fastapi.tiangolo.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

---

**Ready to build? Start coding! 🚀**
