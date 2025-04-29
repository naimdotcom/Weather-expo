import { useLocationStore } from "@/store/locationStore";
import { useWeatherStore } from "@/store/weatherStore";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ArrowLongUpIcon, CloudIcon } from "react-native-heroicons/outline";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const drop = require("@/assets/images/drop.png");
const sun = require("@/assets/images/sun.png");
const cloud = require("@/assets/images/cloud.png");
const wind = require("@/assets/images/wind.png");
const sunset = require("@/assets/images/sunset.png");

const Forecast = () => {
  const location = useLocationStore((state) => state.location);
  const setWeather = useWeatherStore((state) => state.setWeather);
  const weather = useWeatherStore((state) => state.weather);
  const WeatherImages = useWeatherStore((state) => state.weatherImages);
  const weatherImage = useWeatherStore((state) => state.weatherImage);
  const setWeatherImage = useWeatherStore((state) => state.setWeatherImage);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sunRise, setSunRise] = React.useState<string>("");
  const [sunSet, setSunSet] = React.useState<string>("");
  const [countryName, setCountryName] = React.useState<string>("");
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      if (!location) return;
      const response = await fetch(`${apiUrl}${location}&appid=${apiKey}`);
      const data = await response.json();
      if (data) {
        setWeather(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);
  useEffect(() => {
    if (
      !weather?.sys?.sunrise ||
      !weather?.sys?.sunset ||
      weather?.timezone == null
    )
      return;

    const sunriseUTCSeconds = weather.sys.sunrise;
    const sunsetUTCSeconds = weather.sys.sunset;
    const timezoneOffsetSeconds = weather.timezone;

    const getLocalTime = (utcSeconds: number) => {
      const date = new Date((utcSeconds + timezoneOffsetSeconds) * 1000);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHour}:${formattedMinutes} ${ampm}`;
    };

    setSunRise(getLocalTime(sunriseUTCSeconds));
    setSunSet(getLocalTime(sunsetUTCSeconds));
  }, [weather]);

  useEffect(() => {
    const description: string = weather?.weather?.[0].description;
    const iconCode = weather?.weather?.[0].icon;
    const countryName: string =
      countries.getName(weather?.sys?.country, "en", {
        select: "official",
      }) || "";
    const isIncludeWeatherImage = WeatherImages[description];
    if (!description) return;
    setWeatherImage(
      isIncludeWeatherImage ||
        `https://openweathermap.org/img/wn/${iconCode}@4x.png`
    );
    setCountryName(countryName);
  }, [weather]);

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.locationCity}>loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.locationCity}>
        {loading ? "loading" : `${weather?.name ? weather?.name : ""}`}
        <Text style={styles.locationCountry}>
          {countryName ? `, ${countryName}` : ""}
        </Text>
      </Text>
      <Image
        style={styles.image}
        // source={weatherImage}
        source={
          typeof weatherImage === "string"
            ? { uri: weatherImage }
            : weatherImage
        }
        height={200}
        width={200}
      />
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Text style={styles.temp}>
          {loading ? "loading" : weather?.main?.temp.toFixed(1)}°
        </Text>
        <Text style={styles.weatherState}>
          {loading ? "loading" : weather?.weather?.[0]?.main}
        </Text>
      </View>
      {/* states */}
      <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <View style={styles.states}>
          <View style={styles.statesItem}>
            <Image source={wind} height={18} width={18} />
            <View style={styles.windWrapper}>
              <Text style={styles.statesItemText}>
                {loading ? "loading" : weather?.wind?.speed}m/s
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 10 }}>N</Text>
                <ArrowLongUpIcon
                  color="#fff"
                  height={18}
                  width={18}
                  style={{
                    transform: [{ rotate: weather?.wind?.deg + "deg" }],
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.statesItem}>
            <Image source={drop} height={18} width={18} />
            <Text style={styles.statesItemText}>
              {loading ? "loading" : weather?.main?.humidity}%
            </Text>
          </View>
          <View style={styles.statesItem}>
            <Image source={cloud} height={18} width={18} />
            <Text style={styles.statesItemText}>
              {loading ? "loading" : weather?.clouds?.all}%
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.states,
            marginTop: 0,
            justifyContent: "space-around",
          }}
        >
          <View style={styles.statesItem}>
            <Image source={sun} height={18} width={18} />
            <Text style={styles.statesItemText}>
              {loading ? "loading" : sunRise}
            </Text>
          </View>
          <View style={styles.statesItem}>
            <Image source={sunset} height={18} width={18} />
            <Text style={styles.statesItemText}>
              {loading ? "loading" : sunSet}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  locationCity: {
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    color: "#fff",
  },
  locationCountry: {
    fontWeight: "semibold",
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.7)",
  },
  image: {},
  temp: {
    fontWeight: "bold",
    fontSize: 48,
    color: "#fff",
    textAlign: "center",
  },
  weatherState: {
    fontWeight: "semibold",
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    width: "100%",
  },
  states: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "90%",
  },
  statesItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statesItemText: {
    color: "#fff",
    fontWeight: "semibold",
    fontSize: 16,
  },
  windWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default Forecast;
