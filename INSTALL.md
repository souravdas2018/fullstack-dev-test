# Social Media Video Analytics Dashboard - Installation Guide

This project consists of a Node.js/Express backend and a Vue 3 frontend. Follow these instructions to set up and run the project.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will start on http://localhost:3020

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on http://localhost:3021

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Project Structure

```
fullstack-dev-test/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── lib/
│   │   └── __tests__/
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── views/
    │   ├── services/
    │   ├── router/
    │   └── __tests__/
    └── package.json
```

## API Endpoints

- GET `/api/videos/top` - Get top videos by 3-second views
- GET `/api/videos/daily-stats` - Get daily view statistics
- GET `/api/videos/bubble-chart` - Get data for the bubble chart
- GET `/api/videos/overall-stats` - Get overall statistics

## Development Notes

- The backend uses dummy data generators instead of a real database
- The frontend uses Vue 3 with the Composition API
- Charts are implemented using Chart.js and vue-chartjs
- Styling is done with Tailwind CSS 