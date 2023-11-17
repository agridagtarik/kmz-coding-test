import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

const Loading = ({ text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF5B22" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.7)",
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    zIndex: 9999,
  },
  text: {
    color: "#FF5B22",
    marginTop: 5,
  },
});

export default Loading;
