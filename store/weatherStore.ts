import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

interface WeatherState {
  weather: any;
  weatherImage: ImageSourcePropType | string;
  weatherImages: { [key: string]: ImageSourcePropType };
  setWeather: (weather: any) => void;
  setWeatherImage: (weatherImage: any) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  weatherImage: require("@/assets/images/sun.png"),
  weatherImages: {
    "broken clouds": require("@/assets/images/weathers/broken clouds.png"),
    "clear sky": require("@/assets/images/weathers/clear sky.png"),
    haze: require("@/assets/images/weathers/drizzle.png"),
    "few clouds": require("@/assets/images/weathers/few clouds.png"),
    clouds: require("@/assets/images/weathers/few clouds.png"),
    mist: require("@/assets/images/weathers/mist.png"),
    rain: require("@/assets/images/weathers/rain.png"),
    "scattered clouds": require("@/assets/images/weathers/scattered clouds.png"),
    "shower rain": require("@/assets/images/weathers/shower rain.png"),
    snow: require("@/assets/images/weathers/snow.png"),
    thunderstorm: require("@/assets/images/weathers/thunderstorm.png"),
  },
  setWeather: (weather: any) => set({ weather }),
  setWeatherImage: (weatherImage: any) => set({ weatherImage }),
}));
