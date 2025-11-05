# CardMatch Pro - Smart Credit Card Recommendations

> 🚀 **Production-grade full-stack credit card recommendation platform** built with Next.js 14 and FastAPI

A modern, AI-powered platform that helps users find the perfect credit card match based on their spending habits, income, and financial goals. Features real community insights and behavioral science-driven UX.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Using Docker](#using-docker)
- [Deployment](#-deployment)
  - [Frontend (Vercel)](#frontend-vercel)
  - [Backend (Render/Railway)](#backend-renderrailway)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Architecture](#-architecture)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### User-Facing Features
- 🎯 **Smart Matching Algorithm** - Personalized recommendations based on 8 key factors
- 📊 **Eligibility Transparency** - Clear approval likelihood for each card
- 💳 **Premium Card Database** - 20+ verified Indian credit cards
- 🎨 **Behavioral Science UX** - Progress tracking, gamification, and questionnaire best practices
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- 💾 **Progress Persistence** - Auto-save quiz progress in session storage
- 🔒 **Privacy-First** - No data stored on servers, all processing client-side until submission

### Technical Features
- ⚡ **Next.js 14 App Router** - Modern React framework with server components
- 🐍 **FastAPI Backend** - High-performance Python API with automatic docs
- 🎨 **Tailwind CSS** - Utility-first styling with custom design system
- 📦 **TypeScript** - Full type safety across frontend
- 🔄 **RESTful API** - Clean separation of concerns
- 📊 **Analytics Ready** - Built-in support for Google Analytics and custom events
- 🚀 **Production Ready** - Deployment configs for Vercel, Render, and Railway
- 🐳 **Docker Support** - Complete containerization setup

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Analytics**: Vercel Analytics, Google Analytics (optional)
- **SEO**: next-seo

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Validation**: Pydantic v2
- **Server**: Uvicorn with ASGI
- **CORS**: Middleware for cross-origin requests

### DevOps
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render / Railway / Docker
- **Version Control**: Git
- **Container**: Docker & Docker Compose

---

## 📁 Project Structure

```
cardmatch-pro/
├── frontend/                    # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   │   ├── layout.tsx      # Root layout with metadata
│   │   │   └── page.tsx        # Home page (main app)
│   │   ├── components/         # React components
│   │   │   ├── Header.tsx
│   │   │   ├── Landing.tsx
│   │   │   ├── Question.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── Results.tsx
│   │   │   ├── CardRecommendation.tsx
│   │   │   ├── CardModal.tsx
│   │   │   ├── ProgressTracker.tsx
│   │   │   └── ProgressPill.tsx
│   │   ├── lib/                # Utilities and services
│   │   │   ├── api.ts          # API client
│   │   │   ├── storage.ts      # Session storage
│   │   │   ├── utils.ts        # Helper functions
│   │   │   └── questions.ts    # Quiz questions data
│   │   ├── types/              # TypeScript types
│   │   │   └── index.ts
│   │   └── styles/             # Global styles
│   │       └── globals.css
│   ├── public/                 # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── Dockerfile
│
├── backend/                     # FastAPI Backend
│   ├── app/
│   │   ├── main.py             # FastAPI application entry
│   │   ├── core/               # Core configuration
│   │   │   └── config.py       # Settings and environment
│   │   ├── models/             # Pydantic schemas
│   │   │   └── schemas.py
│   │   ├── data/               # Static data
│   │   │   ├── cards.py        # Credit card database
│   │   │   └── questions.py    # Quiz questions
│   │   ├── services/           # Business logic
│   │   │   └── recommendation.py  # Matching algorithm
│   │   └── api/                # API routes
│   │       └── v1/
│   │           ├── __init__.py
│   │           └── endpoints/
│   │               ├── cards.py
│   │               ├── questions.py
│   │               ├── recommendations.py
│   │               └── analytics.py
│   ├── tests/                  # Unit tests
│   ├── requirements.txt
│   ├── Procfile               # For Heroku/Railway
│   ├── render.yaml            # For Render
│   ├── runtime.txt            # Python version
│   └── Dockerfile
│
├── docker-compose.yml          # Docker orchestration
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.11+
- **Git**
- **Docker** (optional, for containerized setup)

### Local Development

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/cardmatch-pro.git
cd cardmatch-pro
```

#### 2️⃣ Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run the server
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`

- API Documentation: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc
- Health Check: http://localhost:8000/health

#### 3️⃣ Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update .env.local with backend URL
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Using Docker

Run both frontend and backend with Docker Compose:

```bash
# Build and start services
docker-compose up --build

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

---

## 🌐 Deployment

### Frontend (Vercel)

#### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your Git repository
3. Select the `frontend` directory as the root
4. Add environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
   ```
5. Click **Deploy**

#### Option 2: Deploy via CLI

```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Backend (Render/Railway)

#### Option 1: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your Git repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   ```
   ENVIRONMENT=production
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
   LOG_LEVEL=INFO
   ```
6. Click **Create Web Service**

#### Option 2: Deploy to Railway

1. Go to [Railway Dashboard](https://railway.app/)
2. Click **New Project** → **Deploy from GitHub**
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - Add `Procfile` (already included)
5. Add environment variables (same as Render)
6. Click **Deploy**

#### Option 3: Deploy with Docker

```bash
cd backend

# Build Docker image
docker build -t cardmatch-backend .

# Run container
docker run -p 8000:8000 \
  -e ALLOWED_ORIGINS=https://your-frontend.vercel.app \
  -e ENVIRONMENT=production \
  cardmatch-backend
```

---

## 📚 API Documentation

### Base URL

- **Local**: `http://localhost:8000`
- **Production**: `https://your-backend-url.com`

### Endpoints

#### Health Check
```http
GET /health
```

Response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "environment": "production"
}
```

#### Get All Questions
```http
GET /api/v1/questions
```

Returns all quiz questions with options.

#### Get All Cards
```http
GET /api/v1/cards
```

Returns all credit cards in the database.

#### Get Recommendations
```http
POST /api/v1/recommendations
Content-Type: application/json

{
  "userData": {
    "name": "John",
    "incomeValue": 1500000,
    "creditScoreValue": 800,
    "cardCount": 2,
    "spendingCategories": ["travel", "dining"],
    "monthlySpendValue": 75000,
    "paymentPreference": ["card_swipe", "online"],
    "primaryGoal": ["rewards", "travel"]
  }
}
```

Response:
```json
{
  "recommendations": [
    {
      "name": "HDFC Infinia",
      "bank": "HDFC Bank",
      "matchScore": 95.0,
      "eligibility": "high",
      "matchCriteria": [...],
      ...
    }
  ],
  "userProfile": {...},
  "gamifiedTagline": "🎯 We found 6 perfect matches for you!"
}
```

#### Track Analytics (Optional)
```http
POST /api/v1/analytics/track
Content-Type: application/json

{
  "event": "quiz_completed",
  "data": {
    "userId": "anonymous_123",
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

---

## 🔐 Environment Variables

### Frontend (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED=true

# SEO
NEXT_PUBLIC_SITE_URL=https://cardmatch-pro.vercel.app
NEXT_PUBLIC_SITE_NAME=CardMatch Pro
```

### Backend (.env)

```bash
# Server Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://cardmatch-pro.vercel.app

# Environment
ENVIRONMENT=development

# Logging
LOG_LEVEL=INFO
```

---

## 🏗️ Architecture

### Recommendation Algorithm

The matching algorithm uses a multi-factor scoring system:

1. **Category Match (30 points per match)**
   - Compares user spending categories with card strengths
   - Maximum: 120 points (4 categories)

2. **Goal Alignment (25 points)**
   - Matches user's financial goals with card benefits
   - cashback, rewards, travel, lifestyle, low fees

3. **Payment Preference (20 points)**
   - Aligns with user's payment methods
   - card swipe, online, mobile wallets, etc.

4. **Eligibility Score (20 points)**
   - Income requirement match
   - Credit score compatibility
   - Existing card history

5. **Affordability (15 points)**
   - Annual fee vs monthly spend ratio
   - Break-even analysis

**Final Score**: 0-100, sorted descending

### Data Flow

```
User Input → Frontend (Next.js)
           ↓
   Session Storage (Progress)
           ↓
   API Request (Axios)
           ↓
Backend (FastAPI) → Recommendation Service
           ↓
   Match Algorithm
           ↓
   Sorted Results
           ↓
Frontend (Results Page)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- **Frontend**: ESLint + Prettier
- **Backend**: Black + Flake8

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Credit card data inspired by TechnoFino and Reddit communities
- Design inspiration from modern fintech apps
- Built with ❤️ using Next.js and FastAPI

---

## 📧 Contact

**Project Maintainer**: Your Name

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

**Live Demo**: https://cardmatch-pro.vercel.app

---

## 🗺️ Roadmap

- [ ] Add bank API integration for real-time eligibility checks
- [ ] Implement user accounts and saved recommendations
- [ ] Add email notifications for new card launches
- [ ] Integrate with credit score APIs
- [ ] Add credit card comparison tool
- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] Mobile app (React Native)

---

**Made with 💙 for the Indian fintech community**
