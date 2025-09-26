# 🌤️ Advance Weather App - Next Gen

A cutting-edge, user-friendly weather application built with modern web technologies. This app delivers real-time weather insights, interactive forecasts, and seamless offline capabilities, all wrapped in a stunning, responsive design. Perfect for staying ahead of the weather, anywhere, anytime!

## 📖 Introduction

Welcome to **Advance Weather App - Next Gen**, a sophisticated weather dashboard that combines powerful API integrations with an intuitive interface. Whether you're planning your day or tracking long-term trends, this app provides accurate data, and beautiful visualizations. Built for the modern web, it supports Progressive Web App (PWA) standards for offline use and instant loading.

<img width="934" height="409" alt="image" src="https://github.com/user-attachments/assets/3d3b99cb-b67e-4689-83db-b18311feb3af" />


This project was developed using Next.js for optimal performance and scalability, ensuring fast renders and SEO-friendly pages. Dive in to explore how technology meets meteorology!

## ✨ Key Features

- 🌍 **Global Weather Search**: Instantly retrieve current conditions, forecasts, and details for any city worldwide via text input.
- 📈 **Dynamic Visualizations**: Interactive temperature charts,  and weekly overviews using Recharts and Embla Carousel for smooth scrolling.
- 📱 **PWA Excellence**: Installable app with service workers for offline access, background sync, and a custom manifest for home screen addition.
- ⚡ **Offline Resilience**: Graceful degradation with cached data, offline indicators, and install prompts for uninterrupted experience.
- 🎨 **Accessible UI**: Built with Radix UI primitives for keyboard navigation, screen reader support, and responsive design across devices.

## 🛠 Technology Stack

This app leverages a robust ecosystem of tools for development, styling, and functionality:

- **Core Framework**: Next.js 14 (App Router) with TypeScript for type-safe, server-side rendering.
- **Styling & UI**: Tailwind CSS 4, clsx & Tailwind Merge for utility-first design; Radix UI for accessible components; Lucide React for icons.
- **Data & Forms**: React Hook Form & Zod for validation; Date-fns for date handling; Sonner for toast notifications.
- **Charts & Carousels**: Recharts for data visualization; Embla Carousel React for responsive sliders.
- **Hooks & Utilities**: Custom React hooks (e.g., useWeather, useFavorites) for state management.
- **PWA & Offline**: Custom service worker (sw.js), manifest.json, and hooks like usePWA for installation prompts.
- **Build Tools**: pnpm for dependency management; PostCSS & Autoprefixer for CSS processing.
- **Weather API**: Integrated with OpenWeatherMap (requires API key for live data).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm installed.
- An OpenWeatherMap API key (free signup at [openweathermap.org](https://openweathermap.org/api)).

### Installation Steps

1. **Clone the Repository**:
   ```
   git clone https://github.com/razazaheer12/Advance_Weather_App-Next_Gen.git
   cd Advance_Weather_App-Next_Gen
   ```

2. **Install Dependencies**:
   ```
   pnpm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key_here
   ```
   Replace `your_openweathermap_api_key_here` with your actual key (e.g., `ab12cd34ef56gh78ij90kl12mn34op56`).

4. **Run in Development Mode**:
   ```
   pnpm dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to see the app in action!

5. **Build for Production**:
   ```
   pnpm build
   pnpm start
   ```

### Troubleshooting
- If you encounter API errors, verify your `NEXT_PUBLIC_WEATHER_API_KEY`.
- For PWA testing, use Chrome DevTools > Application tab.
- Lint code with `pnpm lint` for consistency.

## 📱 How to Use

1. **Search for a City**: Type in the search bar or click the microphone for voice input (e.g., "London").
2. **Explore Weather Data**: View current temperature, feels-like, humidity, wind, visibility, and pressure.
3. **Check Forecasts**: check the weekly view.
4. **Offline Usage**: The app caches recent searches; an indicator shows when offline.

Pro Tip: Enable location services for geolocation-based default weather!

## ☁️ Deployment Guide

Deploying to Vercel is seamless – it's optimized for Next.js!

1. **Connect GitHub Repo**:
   - Log in to [vercel.com](https://vercel.com).
   - Import your `Advance_Weather_App-Next_Gen` repository.

2. **Configure Environment Variables**:
   - In the Vercel dashboard > Settings > Environment Variables:
     - **Key**: `NEXT_PUBLIC_WEATHER_API_KEY`
     - **Value**: Your OpenWeatherMap API key (e.g., `ab12cd34ef56gh78ij90kl12mn34op56`)
     - Scope: All (or Production/Staging as needed).
   - Click "Add" and save.

3. **Set Build Settings** (if needed):
   - Framework Preset: Next.js
   - Root Directory: `/` (default)
   - Build Command: `pnpm build`
   - Output Directory: `.next`

4. **Deploy**:
   - Click "Deploy" – your site will be live in minutes!
   - Custom Domain: Add via Vercel settings.

View Live Browser: [advance-weather-app-next-gen Preview](https://advance-weather-app-next-gen.vercel.app/)

Other Platforms: Netlify (drag-and-drop), Render, or Railway for easy hosting.

## 🤝 Contributing Guidelines

We love contributions! Help make this app even better.

1. **Fork & Clone**: Fork the repo and clone your fork.
2. **Branch**: Create a feature branch: `git checkout -b feature/new-ui-component`.
3. **Develop**: Make changes, test locally (`pnpm dev`), and lint (`pnpm lint`).
4. **Commit**: Use descriptive messages: `git commit -m "feat: add dark mode toggle"`.
5. **Push & PR**: `git push origin feature/new-ui-component` and open a Pull Request.
6. **Review**: Ensure code follows TypeScript standards and includes docs.

Issues? Open a GitHub issue with details. Code of Conduct: Be respectful and inclusive.

## 📜 License

This project is open-source under the **MIT License**. See [LICENSE](LICENSE) for full terms. Feel free to use, modify, and distribute!

## 👏 Acknowledgments

- **Inspiration**: Built with assistance from [v0.app](https://v0.app) for UI prototyping.
- **APIs**: OpenWeatherMap for reliable weather data.
- **Libraries**: Shoutout to the maintainers of Next.js, Tailwind CSS, Radix UI, and more.
- **Community**: Thanks to contributors and the React ecosystem!

---

🌟 **Star this repo** if it helps you! Questions? Open an issue or connect on GitHub. Happy coding & clear skies! ☀️
