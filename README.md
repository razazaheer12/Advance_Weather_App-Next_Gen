# 🌤️ Advance Weather App - Next Gen

A modern, responsive weather application built with Next.js, featuring real-time weather data, forecasts, favorites, offline support, and voice search. Experience seamless weather tracking with a beautiful UI powered by Tailwind CSS and advanced components.

## 📋 Overview

The Advance Weather App is a next-generation weather dashboard designed for users who want accurate, visually appealing weather information at their fingertips. It integrates with weather APIs to provide current conditions, hourly and weekly forecasts, and interactive charts. Key highlights include:

- **Real-time Weather Updates**: Fetch live data for any city worldwide.
- **Progressive Web App (PWA)**: Installable, works offline with service workers.
- **Voice Search**: Hands-free city search using speech recognition.
- **Favorites Management**: Save and quickly access your favorite locations.
- **Theme Support**: Light/dark mode with automatic switching.
- **Offline Indicator**: Graceful handling of network issues.

This app is built for performance and accessibility, ensuring a smooth experience on desktop and mobile devices.

## 🚀 Features

- 🌍 **Global City Search**: Search for weather in any city using text or voice input.
- 📊 **Interactive Charts**: Visualize temperature trends with Recharts.
- ☁️ **Detailed Forecasts**: Hourly carousel and weekly overview with weather cards.
- ❤️ **Favorites List**: Add, remove, and persist favorite cities locally.
- 📱 **PWA Capabilities**: Install prompt, offline caching, and background sync.
- 🎨 **Custom UI Components**: Reusable Radix UI and Tailwind-based elements.
- 🔊 **Voice Integration**: Speech-to-text for natural language queries.
- 🌙 **Theme Provider**: Dynamic theming with next-themes.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4, PostCSS, clsx, Tailwind Merge
- **UI Components**: Radix UI, Lucide React icons, Shadcn/UI
- **Charts & Data Viz**: Recharts, Embla Carousel
- **Forms & Validation**: React Hook Form, Zod
- **State Management**: Custom hooks (useWeather, useFavorites, etc.)
- **PWA & Offline**: Workbox service worker, Manifest.json
- **Utilities**: Date-fns, Sonner for toasts
- **Package Manager**: pnpm

## 📦 Installation

1. **Clone the Repository**:
   ```
   git clone https://github.com/razazaheer12/Advance_Weather_App-Next_Gen.git
   cd Advance_Weather_App-Next_Gen
   ```

2. **Install Dependencies**:
   ```
   pnpm install
   ```

3. **Environment Setup** (Optional):
   - Create a `.env.local` file and add your weather API key (e.g., OpenWeatherMap):
     ```
     NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
     ```

4. **Run the Development Server**:
   ```
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```
   pnpm build
   pnpm start
   ```

## 🔧 Usage

- **Search for Weather**: Enter a city name in the search bar or use voice search (click the microphone icon).
- **View Details**: Select a city to see current weather, feels-like temperature, humidity, wind speed, visibility, and pressure.
- **Forecasts**: Scroll through the hourly carousel or view the weekly forecast.
- **Add Favorites**: Click the heart icon on a weather card to save it.
- **Offline Mode**: The app caches data and shows an offline indicator when disconnected.
- **Install as PWA**: On supported browsers, click the install prompt to add to your home screen.

For API integration, ensure you have a valid key from a weather service like OpenWeatherMap. The app defaults to placeholder data if not configured.

## 🚀 Deployment

This project is optimized for Vercel (serverless deployment with automatic builds).

1. **Push to GitHub**: Ensure your repo is up to date.
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and import your GitHub repo.
   - Add environment variables (e.g., `NEXT_PUBLIC_WEATHER_API_KEY`).
   - Deploy – your app will be live instantly!

Alternative platforms: Netlify, Railway, or any Node.js host.

Live Demo: [Vercel Deployment](https://vercel.com/muhammad-razas-projects-a27e171a/v0-next-gen-weather-app)

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit changes: `git commit -m 'Add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

Please adhere to the code style (TypeScript, ESLint via `pnpm lint`) and include tests for new features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.app) for rapid prototyping.
- Weather icons and data inspired by OpenWeatherMap.
- Thanks to the open-source community for libraries like Next.js and Tailwind CSS.

---

*⭐ Star this repo if you found it useful! Feel free to reach out for questions or collaborations.*
