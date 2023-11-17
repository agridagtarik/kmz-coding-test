import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext, AuthContextData } from "../Context/AuthContext";

import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

import Topbar from "../Components/TopBar";
import Loading from "../Components/Loading";

import Search from "./Search";
import Cart from "./Cart";
import Label from "./Label";
import Profile from "./Profile";
import { MyAlert } from "../Components/MyAlert";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HomepageOne from "../Components/HomepageOne";
import HomepageTwo from "../Components/HomepageTwo";

export type CategoryType = {
  id: number;
  name: string;
  url: string;
};

const HomePageHome = () => {
  const { userData, mainHomepage, setMainHomepage } = useContext(
    AuthContext
  ) as AuthContextData;

  const [loading, setLoading] = useState<boolean>(false);
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);

  const handleMainCategories = async () => {
    setLoading(true);
    await axios
      .get(`https://apiv5.akilliticaretim.com/api/v5/ad/product/categories`, {
        headers: {
          GUID: "24BE-DB0E-D75E-4060",
        },
      })
      .then(function (response) {
        if (response.data.status === true) {
          setCategoriesData(response.data.data.categories);
        } else {
          console.error("Categories not found");
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        alert("Failed to fetch categories");
        setLoading(false);
      });
  };

  useEffect(() => {
    handleMainCategories();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Topbar />
        {loading && (
          <Loading text={"Kategoriler yükleniyor; Lütfen bekleyiniz..."} />
        )}

        {mainHomepage === false ? (
          <HomepageOne
            setMainHomepage={setMainHomepage}
            data={categoriesData}
          />
        ) : (
          <HomepageTwo data={categoriesData} />
        )}
      </View>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

export default function HomePage() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePageHome"
        component={HomePageHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Label"
        component={Label}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profil"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({});
