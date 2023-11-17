import React, { useState, useEffect, useContext, useReducer } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { MyAlert } from "./MyAlert";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

import { initialCartState, cartReducer } from "../Context/Cart/Reducer";

const HomepageTwo = ({ data }) => {
  const { defaultMainCat, setDefaultMainCat, userData } =
    useContext(AuthContext);

  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const [mainCategoryId, setMainCategoryId] = useState(defaultMainCat.id);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [subCategoryDefaultBtn, setSubCategoryDefaultBtn] = useState();

  const [productData, setProductData] = useState([]);

  const [loading, setLoading] = useState(false);

  const addItemToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItemFromCart = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const handleSubCategories = async (mainCatId) => {
    // setLoading(true);
    await axios
      .get(
        `https://apiv5.akilliticaretim.com/api/v5/ad/product/categories?parentId=${mainCatId}`,
        {
          headers: {
            GUID: "24BE-DB0E-D75E-4060",
          },
        }
      )
      .then(function (response) {
        if (response.data.status === true) {
          setSubCategoriesData(response.data.data.categories);
          setSubCategoryDefaultBtn(response.data.data.categories[0].id);
        } else {
          MyAlert("Bilgi", "Listenecek Alt Kategori Bulunmamaktadır...");
        }
        // setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        MyAlert(
          "Yükleme başarısız (Alt Kategori Ürünleri)",
          "Lütfen daha sonra tekrar deneyiniz..."
        );
        // setLoading(false);
      });
  };

  const handleProducts = async (productId) => {
    setLoading(true);
    setSubCategoryDefaultBtn(productId);
    await axios
      .get(
        `https://apiv5.akilliticaretim.com/api/v5/sf/product/category_products?Id=${productId}&PageNumber=1&PageSize=10`,
        {
          headers: {
            GUID: "24BE-DB0E-D75E-4060",
          },
        }
      )
      .then(function (response) {
        if (response.data.status === true) {
          setProductData(response.data.data);
        } else {
          MyAlert("Bilgi", "Listenecek Ürün Bulunmamaktadır...");
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        MyAlert(
          "Yükleme başarısız (Ürünler)",
          "Lütfen daha sonra tekrar deneyiniz..."
        );
        setLoading(false);
      });
  };

  const handleAddProduct = async ({ productId, amount }) => {
    await axios
      .post(
        `https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart`,
        { productId: productId, amount: amount },
        {
          headers: {
            GUID: "24BE-DB0E-D75E-4060",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        MyAlert("Alışveriş", response.data.data.message);
      })
      .catch(function (err) {
        console.log(err, "error");
      });
  };

  const onChange = (type, productId, product) => {
    if (type === "inc") {
      addItemToCart(product);

      handleAddProduct({ productId: productId, amount: 1 });
    } else {
      removeItemFromCart(product);
    }
  };

  const isInCart = (productId) => {
    let text;
    let hasIteminCart;
    const foundItem = cartState?.items?.find((item) => item.id === productId);
    if (foundItem) {
      text = "Sepette";
      hasIteminCart = true;
      return { text, hasIteminCart };
    } else {
      text = "Ekle";
      hasIteminCart = false;
      return { text, hasIteminCart };
    }
  };

  useEffect(() => {
    handleSubCategories(mainCategoryId);
  }, [mainCategoryId]);

  useEffect(() => {
    handleProducts(subCategoryDefaultBtn);
  }, [subCategoryDefaultBtn]);

  return (
    <View style={styles.container}>
      {loading && <Loading text={"Veriler yükleniyor; Lütfen bekleyiniz..."} />}
      <View style={styles.mainCategories}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => (
            <View style={styles.oneCard} key={index}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="image-not-supported"
                  size={mainCategoryId === item.id ? 50 : 40}
                  color={"gray"}
                  onPress={() => {
                    setMainCategoryId(item.id);
                    handleSubCategories(mainCategoryId);
                  }}
                  style={[
                    mainCategoryId === item.id
                      ? {
                          borderWidth: 1,
                          borderColor: "#FF5B22",
                          borderRadius: 5,
                        }
                      : { borderWidth: 0 },
                  ]}
                />
              </View>
              <View>
                <Text
                  style={[
                    mainCategoryId === item.id
                      ? {
                          fontSize: 10,
                          textAlign: "center",
                          fontWeight: "600",
                        }
                      : { fontSize: 10, textAlign: "center" },
                  ]}
                >
                  {item.categoryName}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.subCategories}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {subCategoriesData.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[
                  styles.subCatbtns,
                  item.id === subCategoryDefaultBtn
                    ? { backgroundColor: "#FF5B22" }
                    : { backgroundColor: "#F0F0F0" },
                ]}
                onPress={() => {
                  setSubCategoryDefaultBtn(item.id);
                }}
              >
                <Text
                  style={[
                    item.id === subCategoryDefaultBtn
                      ? {
                          fontSize: 10,
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                        }
                      : { fontSize: 10, textAlign: "center", color: "#7D7C7C" },
                  ]}
                >
                  {item.categoryName}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.products}>
        <FlatList
          data={productData}
          renderItem={({ item, index }) => (
            <View style={styles.oneCardPro}>
              <View
                style={{
                  // borderWidth: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <MaterialIcons
                  name="add-circle"
                  size={23}
                  style={{ color: "rgba(255, 91, 34,0.5)" }}
                  onPress={() => {
                    onChange("inc", item.id, item);
                  }}
                  disabled={isInCart(item.id)?.hasIteminCart}
                />
                <Text>{isInCart(item.id)?.text}</Text>
                <MaterialIcons
                  name="do-not-disturb-on"
                  size={23}
                  style={{ color: "rgba(255, 91, 34,0.5)" }}
                  onPress={() => {
                    onChange("dec", item.id, item);
                  }}
                  disabled={!isInCart(item.id)?.hasIteminCart}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  // borderWidth: 1,
                  margin: 0,
                  padding: 1,
                  width: "100%",
                  height: "50%",
                }}
              >
                <Image
                  style={styles.img}
                  src={item.productImages[0].imagePath}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    color: "#FF5B22",
                    fontWeight: "600",
                  }}
                >
                  {item.priceVat} tl
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {item.stockName}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {item.stockType}
                </Text>
              </View>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  mainCategories: {
    width: 330,
    height: "15%",
    margin: 5,
    padding: 3,
  },
  subCategories: {
    width: 330,
    height: "10%",
    margin: 5,
    padding: 3,
  },
  products: {
    width: 330,
    height: "70%",
    margin: 5,
    padding: 3,
    justifyContent: "center",
    alignContent: "center",
  },
  oneCard: {
    margin: 5,
    flexDirection: "column",
    width: 75,
    height: 60,
  },
  subCatbtns: {
    borderRadius: 40,
    padding: 5,
    elevation: 2,
    margin: 3,
    height: 40,
    width: 110,
    justifyContent: "center",
  },
  oneCardPro: {
    margin: 3,
    flexDirection: "column",
    width: 100,
    height: 170,
    padding: 2,
    alignSelf: "center",
    // borderWidth: 1,
  },
  img: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomepageTwo;
