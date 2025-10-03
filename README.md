# ScanQuzzy

ScanQuzzy is an AI-driven platform that converts any content (printed, digital, or video) into interactive quizzes. This React Native + Expo scaffold showcases the end-to-end workflow including content ingestion, AI processing, quiz generation, exporting, and analytics.

## Getting Started

```bash
npm install
npm start
```

Use the Expo CLI prompts to open the project on iOS, Android, or the web.

## Features

- Authentication flow with JWT placeholder endpoints
- Content ingestion via camera, gallery, document upload, URL, and YouTube links
- AI-powered quiz generation with multiple question formats
- Interactive quiz taking experience with timers and navigation
- Export options for PDF, Google Forms, and QTI
- Analytics dashboard with offline caching via AsyncStorage
- Dark mode and multi-language support (English + Spanish)

## Project Structure

```
/src
  /components       # Reusable UI widgets (QuizCard, ScanButton, StatsCard)
  /navigation       # React Navigation stack definitions
  /screens          # App screens (auth, dashboard, quiz, analytics, settings)
  /services         # Axios client and API helpers
  /store            # Redux Toolkit slices and store configuration
  /hooks            # Custom hooks (bootstrap state)
  /i18n             # i18next configuration
  /theme            # React Native Paper theming
App.tsx             # Application entry point with providers
```

## API Endpoints

This scaffold targets a NestJS backend hosted at `https://api.scanquzzy.com` with the following endpoints:

- `POST /auth/login`
- `POST /auth/signup`
- `POST /content/upload`
- `POST /quiz/generate`
- `POST /quiz/submit`
- `GET /analytics/user`

All network calls are handled through a centralized Axios instance located at `src/services/api.ts`.

## Notes

- Replace placeholder assets under the `assets/` directory with branded icons and splash screens.
- Ensure native modules (camera, document picker, PDF viewer) are properly configured for bare builds if you eject from Expo.
- React Native Paper is used for a modern, accessible UI following the ScanQuzzy color palette (primary `#1A73E8`, accent `#6C63FF`).
- The project is structured to be production-ready with TypeScript, linting, offline caching, and multi-language support.
