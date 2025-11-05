# CardMatch Pro - Frontend

Next.js 14 frontend application for credit card recommendations.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Analytics**: Vercel Analytics

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED=true
```

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/             # Utilities and services
├── types/           # TypeScript types
└── styles/          # Global styles
```

## Key Components

- **Landing.tsx**: Hero section and CTAs
- **Question.tsx**: Interactive quiz questions
- **Results.tsx**: Recommendation results page
- **CardRecommendation.tsx**: Individual card display
- **Header.tsx**: App header
- **ProgressTracker.tsx**: Quiz progress display

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Manual Build

```bash
npm run build
npm start
```

## API Integration

The app communicates with the FastAPI backend via `lib/api.ts`.

Key API functions:
- `getRecommendations()` - Get card recommendations
- `getQuestions()` - Fetch quiz questions
- `getAllCards()` - Get all credit cards
- `trackEvent()` - Analytics tracking

## Customization

### Styling

Edit `src/styles/globals.css` or component files directly.

### Questions

Questions are defined in `src/lib/questions.ts`. Modify as needed.

### Components

All components are in `src/components/`. They're fully typed with TypeScript.

## Performance

- **Server Components**: Used where possible
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with App Router
- **Analytics**: Vercel Analytics built-in

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
