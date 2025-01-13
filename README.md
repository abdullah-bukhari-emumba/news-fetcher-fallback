# News Aggregator Frontend

A modern news aggregator that pulls articles from various sources and displays them in a clean, easy-to-read format. Built with React, TypeScript, and Vite.

## Features

- 🔍 Advanced article search and filtering
  - Search by keywords
  - Filter by date range using date picker
  - Filter by news categories (technology, business, sports, etc.)
  - Filter by multiple news sources
- 👤 Personalized news feed
  - Customize preferred sources from multiple providers
  - Select favorite categories for tailored content
  - Follow specific authors and publications
- 📱 Fully responsive design
  - Optimized for mobile devices
  - Fluid layout adapts to all screen sizes
  - Touch-friendly interface
- 🎨 Modern UI/UX
  - Clean and intuitive interface with Tailwind CSS
  - Accessible design following WCAG guidelines
  - Dark/light mode support
- 🔄 Real-time updates
  - Live data fetching with React Query
  - Automatic content refresh
  - Loading states and error handling
- 🌐 Multiple news sources integration:
  - NewsAPI for comprehensive coverage
  - The Guardian for quality journalism
  - New York Times for in-depth reporting

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- TailwindCSS for styling
- React Query for data fetching
- React Router for navigation
- Docker for containerization

## Prerequisites

Before running the application, make sure you have:

- Node.js 18+ installed
- Docker Desktop installed and running
- Git for version control
- Code editor (VS Code recommended)
- Terminal access

- Docker installed on your machine
- API keys for the following services:
  - NewsAPI.org
  - The Guardian API
  - New York Times API

## Running with Docker

1. Clone the repository:
```
git clone <repository-url>
cd news-fetcher-fallback
```

2. Create a `.env` file in the root directory with your API keys:
```
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NYT_API_KEY=your_nyt_api_key
VITE_NEWS_API_KEY=your_newsapi_key
```

3. Build the Docker image:
```bash
docker build -t news-collector .
```

4. Run the container:
```bash
docker run -p 80:80 news-collector
```

5. Access the application:
Open your browser and navigate to `http://localhost:80`

## Development with Docker

For development purposes, you can use the following commands:

1. Build the development image:
```bash
docker build -t news-collector:dev --target build .
```

2. Run the development container:
```bash
docker run -p 8080:8080 -v $(pwd):/app news-collector:dev
```

## Troubleshooting

If you encounter any issues:

1. Make sure all required API keys are properly set in the `.env` file
2. Verify Docker is running on your machine
3. Check if port 80 is available on your system
4. For development mode, ensure port 8080 is free

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
