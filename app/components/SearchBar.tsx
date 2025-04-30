import { useIsIOS } from "@/store/isIosStore";
import { useLocationStore } from "@/store/locationStore";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/solid";
const SearchBar = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { location, setLocation } = useLocationStore();
  const { isIOS } = useIsIOS();

  const handleChangeText = (text: string) => {
    setLocation(text);
  };
  const debounceSearch = useCallback(
    debounce((text: string) => {
      if (!text || text === "undefined" || typeof text !== "string") return;
      if (text && text !== "undefined") {
        setLocation(text);
      }
    }, 1500),
    []
  );
  return (
    <KeyboardAvoidingView behavior={isIOS ? "padding" : "height"}>
      <ScrollView
        contentContainerStyle={{
          alignSelf: "flex-start",
          width: "100%",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ ...styles.container, marginTop: isIOS ? 0 : 10 }}>
          <View
            style={{
              ...styles.wrapper,
              backgroundColor: showSearch
                ? "rgba(255, 255, 255, 0.2)"
                : "transparent",
            }}
          >
            {showSearch && (
              <TextInput
                placeholder="Search City"
                placeholderTextColor={"#fff"}
                style={styles.input}
                onChangeText={debounceSearch}
              ></TextInput>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowSearch(!showSearch)}
            >
              <MagnifyingGlassIcon size={24} color={"#fff"} />
            </TouchableOpacity>
          </View>
          {/* TODO: add search results */}
          {/* {locations.length > 0 && showSearch ? (
        <View style={styles.locationsBox}>
          {locations.map((loc, index) => {
            const showBorder = index !== locations.length - 1;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  ...styles.locationItem,
                  borderBottomWidth: showBorder ? 1 : 0,
                }}
                onPress={() => handleLocationSelect(loc)}
              >
                <MapPinIcon size={20} color={"gray"} />
                <Text style={styles.locationsText}>London, United Kingdom</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        ""
      )} */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal: 16,
    position: "relative",
    zIndex: 50,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingLeft: 16,
    height: 40,
    fontSize: 16,
    color: "#fff",
    // paddingBottom: 8,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 12,
    borderRadius: 100,
    margin: 4,
  },
  icon: {
    color: "#fff",
  },
  locationsBox: {
    position: "absolute",
    top: 4 * 16,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 8,
  },
  locationItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    padding: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  locationsText: {
    marginLeft: 8,
    fontSize: 18,
    color: "#000",
  },
});

export default SearchBar;
