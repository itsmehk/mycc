# CardMatch Pro - Backend

FastAPI backend for credit card recommendation engine.

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Validation**: Pydantic v2
- **Server**: Uvicorn (ASGI)

## Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload

# Run with specific host/port
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Environment Variables

Create a `.env` file:

```bash
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true
ALLOWED_ORIGINS=http://localhost:3000
ENVIRONMENT=development
LOG_LEVEL=INFO
```

## Project Structure

```
app/
├── main.py              # FastAPI app entry
├── core/               # Configuration
├── models/             # Pydantic schemas
├── data/               # Static data (cards, questions)
├── services/           # Business logic
└── api/                # API routes
    └── v1/
        └── endpoints/  # API endpoints
```

## API Endpoints

### Health Check
```
GET /health
```

### Questions
```
GET /api/v1/questions
```

### Cards
```
GET /api/v1/cards
GET /api/v1/cards/{bank_code}
```

### Recommendations
```
POST /api/v1/recommendations
Body: { "userData": {...} }
```

### Analytics
```
POST /api/v1/analytics/track
Body: { "event": "...", "data": {...} }
```

## Interactive API Docs

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Recommendation Algorithm

The matching algorithm in `services/recommendation.py` uses:

1. **Eligibility Scoring**
   - Income match (0-40 points)
   - Credit score match (0-30 points)
   - Existing cards bonus (0-30 points)

2. **Preference Matching**
   - Category alignment (30 points each)
   - Goal matching (25 points)
   - Payment method (20 points)
   - Affordability (15 points)

Total score: 0-100, sorted descending.

## Data Files

### Cards Database
`app/data/cards.py` - Contains all credit cards with:
- Basic info (name, bank, fees)
- Eligibility requirements
- Features and perks
- Categories and goals
- Affiliate links

### Questions
`app/data/questions.py` - Quiz questions with options

## Adding New Cards

Edit `app/data/cards.py`:

```python
{
    "name": "New Card Name",
    "bank": "Bank Name",
    "bankCode": "bank_code",
    "cardImageKey": "image_key",
    "minIncome": 500000,
    "minCreditScore": 700,
    "annualFee": 999,
    "estimatedValue": 25000,
    "effectiveRewardRate": 0.05,
    "features": [...],
    "detailedPerks": [...],
    "type": "standard",
    "categories": ["shopping", "dining"],
    "goals": ["cashback"],
    "paymentMethods": ["online"],
    "affiliateTag": "tag",
    "partnerId": "partner_id",
    "applyUrl": "https://..."
}
```

## Testing

```bash
# Install pytest
pip install pytest pytest-asyncio httpx

# Run tests
pytest

# Run with coverage
pytest --cov=app tests/
```

## Deployment

### Render
Use `render.yaml` configuration

### Railway
Use `Procfile` for deployment

### Docker
```bash
docker build -t cardmatch-backend .
docker run -p 8000:8000 cardmatch-backend
```

## CORS Configuration

Configure allowed origins in `.env`:

```bash
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

## Logging

Logs are output to console. Configure level in `.env`:

```bash
LOG_LEVEL=INFO  # DEBUG, INFO, WARNING, ERROR, CRITICAL
```

## Performance Tips

- Uvicorn with multiple workers (production):
  ```bash
  uvicorn app.main:app --workers 4
  ```

- Use gunicorn with uvicorn workers:
  ```bash
  gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
  ```

## Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Pydantic](https://docs.pydantic.dev)
- [Uvicorn](https://www.uvicorn.org)
