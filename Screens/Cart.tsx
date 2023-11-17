import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Topbar from "../Components/TopBar";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { MyAlert } from "../Components/MyAlert";

function CartHome({ navigation }) {
  const { userData, setMainHomepage } = useContext(AuthContext);

  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);

  const handleCartData = async (userData_token) => {
    await axios
      .get(`https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart-v2`, {
        headers: {
          GUID: "24BE-DB0E-D75E-4060",
          Authorization: `Bearer ${userData_token}`,
        },
      })
      .then(function (response) {
        if (response.data.status === true) {
          setCartData(response.data.data.detail);
          setCartTotal(response.data.data.basket.generalTotalPrice);
        }
      })
      .catch(function (error) {
        console.log(error);
        MyAlert(
          "Yükleme başarısız (Sepet Ürünleri)",
          "Lütfen daha sonra tekrar deneyiniz..."
        );
      });
  };

  useEffect(() => {
    handleCartData(userData.token);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Topbar />
        <View
          style={{
            width: "100%",
            height: "50%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "15%",
              margin: 3,
              padding: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 24, color: "gray" }}>
              Favorilerim
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: "80%",

              margin: 3,
              padding: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ScrollView style={{ width: "90%" }}>
              {cartData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    margin: 5,
                    padding: 3,
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Image style={styles.img} src={item.productImage} />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        height: 35,
                        textAlignVertical: "center",
                      }}
                    >
                      {item.stockName} ({item.saleUnit})
                    </Text>
                    <Text
                      style={{
                        height: 35,
                        textAlignVertical: "center",
                      }}
                    >
                      {item.qty}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      width: 70,
                    }}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={25}
                      color={"gray"}
                      style={{ alignSelf: "flex-end" }}
                    />
                    <Text
                      style={{
                        alignSelf: "flex-end",
                        fontSize: 14,
                        fontWeight: "700",
                        color: "rgb(255, 91, 34)",
                      }}
                    >
                      {item.totalPrice} tl
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 300,
              height: 45,
              justifyContent: "space-between",
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              margin: 5,
              padding: 10,
              backgroundColor: "#D0D4CA",
              opacity: 0.5,
            }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 20 }}>
              İndirim Kuponu Gir yada Seç
            </Text>
            <Ionicons name="chevron-down" size={30} color={"gray"} />
          </View>
        </View>
        <Text
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: 10,
            margin: 5,
            padding: 2,
          }}
        >
          Ücretsiz Teslimat için 57,50 tl değerinde alışveriş yapmalısınız.
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "rgb(255, 91, 34)",
            fontSize: 12,
            fontWeight: "bold",
            margin: 5,
            padding: 2,
          }}
        >
          Devam etmek için sepetiniz 7,25 tl değerinde ürün eklemelisiniz
        </Text>
        <View
          style={{
            width: "100%",
            height: "17%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "rgb(255, 91, 34)",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 10,
              padding: 3,
            }}
          >
            {cartTotal} tl
          </Text>
          <View
            style={{
              width: 300,
              height: 45,
              justifyContent: "space-between",
              borderRadius: 5,
              alignItems: "center",
              margin: 5,
              padding: 10,
              backgroundColor: "rgb(255, 91, 34)",
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
              Sepeti Onayla
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const Stack = createNativeStackNavigator();
export default function Cart({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartHome"
        component={CartHome}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 75,
    height: 75,
  },
});
