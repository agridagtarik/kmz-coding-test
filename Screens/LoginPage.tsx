import React, { useContext, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../Context/AuthContext";

import HomePage from "./HomePage";
import Search from "./Search";
import Cart from "./Cart";
import Label from "./Label";
import Profile from "./Profile";

const MainStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

type UserDataType = { [key: string]: any };
type AuthContextData = {
  handleLogin: (userName: string, pwd: string) => Promise<void>;
  userData: UserDataType;
  isAuthenticated: boolean;
  setIsAuthenticated: (newValue: boolean) => void;
};

const MainStackScreen = ({
  userData,
}: React.PropsWithChildren<AuthContextData>) => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen
      name="HomePage"
      component={HomePage}
      initialParams={userData}
    />

    <MainStack.Screen name="Search" component={Search} />
    <MainStack.Screen name="Cart" component={Cart} />
    <MainStack.Screen name="Label" component={Label} />
    <MainStack.Screen name="Profile" component={Profile} />
  </MainStack.Navigator>
);

export default function LoginPage() {
  // props
  const { handleLogin, userData, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext) as AuthContextData;

  const [text, onChangeText] = useState<string>("");
  const [number, onChangeNumber] = useState<string>("");

  return (
    <SafeAreaView style={styles.main}>
      {!isAuthenticated ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={{
              backgroundColor: "#FF5B22",
              alignItems: "center",
              flex: 1,
              paddingTop: 150,
            }}
          >
            <View style={styles.appName}>
              <Text style={styles.appNametext}>basdas app</Text>
            </View>
            <View style={styles.enter}>
              <TextInput
                onChangeText={onChangeText}
                placeholder="Kullanıcı adınızı giriniz"
                value={text}
                style={styles.input}
              />
              <TextInput
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Parolanızı giriniz"
                secureTextEntry={true}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => handleLogin(text, number)}
                style={styles.enterBtn}
              >
                <Text style={styles.text}>Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, size }) => {
                let iconName;
                if (route.name === "Anasayfa") {
                  iconName = focused ? "ios-home" : "ios-home-outline";
                  size = focused ? size + 7 : size + 2;
                } else if (route.name === "Arama") {
                  iconName = focused ? "search" : "search-outline";
                  size = focused ? size + 7 : size + 2;
                } else if (route.name === "Sepet") {
                  iconName = focused ? "cart" : "cart-outline";
                  size = focused ? size + 7 : size + 2;
                } else if (route.name === "Etiket") {
                  iconName = focused ? "pricetags" : "pricetags-outline";
                  size = focused ? size + 7 : size + 2;
                } else if (route.name === "Profil") {
                  iconName = focused
                    ? "person-circle"
                    : "person-circle-outline";
                  size = focused ? size + 7 : size + 2;
                }

                return <Ionicons name={iconName} size={size} color="white" />;
              },
              tabBarStyle: {
                backgroundColor: "#FF5B22",
                height: "8%",
              },
              tabBarShowLabel: false,
            })}
          >
            <Tab.Screen
              name="Anasayfa"
              component={HomePage}
              initialParams={userData}
              options={{ headerShown: false }}
            />

            <Tab.Screen
              name="Arama"
              component={Search}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Sepet"
              component={Cart}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Etiket"
              component={Label}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Profil"
              component={Profile}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  enter: {
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    margin: 30,
    padding: 5,
    height: 70,
    width: 300,
    justifyContent: "center",
    alignContent: "center",
  },
  appNametext: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 44,
    fontStyle: "italic",
    color: "white",
  },
  input: {
    height: 50,
    borderWidth: 1,
    width: 250,
    margin: 10,
    padding: 5,
    borderRadius: 15,
    borderColor: "gray",
    backgroundColor: "white",
  },
  enterBtn: {
    height: 50,
    borderWidth: 1,
    width: 150,
    margin: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "gray",
    backgroundColor: "#39A7FF",
    marginTop: 50,
  },
  text: {
    color: "white",
  },
});
