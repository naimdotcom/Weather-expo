import { Image, Platform, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar";
import { useIsIOS } from "@/store/isIosStore";
import { useEffect } from "react";
import Forecast from "./components/Forecast";

export default function Index() {
  const { setIsIOS, isIOS } = useIsIOS();
  useEffect(() => {
    const check = Platform.OS === "ios";
    setIsIOS(check);
    console.log("isIOS", isIOS);
  }, []);
  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: 0.55,
        }}
        resizeMode="stretch"
      />
      <SafeAreaView style={styles.safeviwe}>
        <SearchBar />
        <Forecast />
      </SafeAreaView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  safeviwe: {
    flex: 1,
  },
};
