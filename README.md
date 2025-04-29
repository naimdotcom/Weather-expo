# Weather Native 🌦️

A sleek, cross-platform weather app built using **Expo Router**, **React Native**, and **Zustand**. It fetches real-time weather data from the OpenWeatherMap API, offering a clean UI and smooth experience across iOS, Android, and web.

## 🚀 Features

- 🔍 Search for cities and get current weather conditions
- 🌡️ Display temperature, humidity, wind speed, wind direction and cloudiness
- 🌅 Sunrise and sunset time
- 🎨 Dynamic weather images based on weather description
- 🧠 State management using `zustand`
- 📱 Optimized for iOS and Android with platform detection

## 🧰 Tech Stack

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [OpenWeatherMap API](https://openweathermap.org/api)
- TypeScript, Lodash, and modern navigation via `expo-router`

## 📦 Installation

```bash
https://github.com/naimdotcom/Weather-expo.git
cd Weather-expo
npm install
```

## ▶️ Running the App

```bash
npx expo start
```

Then choose to open the app in:

- Expo Go (mobile)
- Android emulator
- iOS simulator
- Web browser

## 🧪 Testing

```bash
npm run test
```

Uses `jest-expo` for unit testing.

## 🔧 Project Structure

```
naimdotcom-weather-expo/
├── app/
│   ├── components/        # Forecast and Search UI
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Main screen
├── assets/
│   ├── fonts/             # Custom fonts
│   └── images/            # Weather icons and backgrounds
├── store/                 # Zustand state management
├── app.config.ts          # Environment config
├── eas.json               # EAS build profiles
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 Environment Variables

Add the following to your `.env` file:

```env
API_URL=https://api.openweathermap.org/data/2.5/weather?units=metric&q=
API_KEY=your_api_key_here
```

These are accessed via `process.env` and used in `app.config.ts`.

## 📄 License

MIT

---

Made with ❤️ by [naimdotcom]
