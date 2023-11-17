import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext, AuthContextData } from "../Context/AuthContext";

const Topbar = () => {
  const { userData, setMainHomepage } = useContext(
    AuthContext
  ) as AuthContextData;

  return (
    <View style={styles.topBar}>
      <View style={styles.topBarItems}>
        <Ionicons
          name="menu"
          size={30}
          color={"#FF5B22"}
          onPress={() => {
            console.log("LeftSideBar çıksın");
          }}
        />

        <Text
          style={{ marginLeft: 10, fontSize: 16, padding: 3 }}
          onPress={() => {
            setMainHomepage(false);
          }}
        >
          Basdas Logo
        </Text>
      </View>

      <View style={styles.topBarItems}>
        <View
          style={{
            borderRightWidth: 1,
            flexDirection: "row",
            marginRight: 10,
            padding: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              padding: 3,
            }}
          >
            Location
          </Text>

          <Ionicons
            name="paper-plane"
            size={24}
            color={"#00A9FF"}
            style={{ padding: 3 }}
          />
        </View>

        <Ionicons
          name="notifications-outline"
          size={28}
          color={"gray"}
          style={{ marginTop: 4 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    padding: 10,
    paddingTop: 30,
    backgroundColor: "white",
    height: "12%",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },
  topBarItems: {
    flexDirection: "row",
  },
});

export default Topbar;
