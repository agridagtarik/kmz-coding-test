import React, { useContext } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { AuthContext, AuthContextData } from "../Context/AuthContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type CategoryType = {
  id: number;
  name: string;
  url: string;
  categoryName: string;
};

type HomepageOneProps = {
  data: CategoryType[];
  setMainHomepage: (newValue: boolean) => void;
};

const HomepageOne: React.FC<HomepageOneProps> = ({ setMainHomepage, data }) => {
  const { defaultMainCat, setDefaultMainCat } = useContext(
    AuthContext
  ) as AuthContextData;

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={[styles.categories, { height: "18%" }]}>
        <View style={[styles.categoriesInner]}>
          <Text>FotoFotoFoto</Text>
        </View>
      </View>

      <View style={[styles.categories, { height: "65%" }]}>
        <View style={[styles.categoriesInner]}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              // console.log(item);

              return (
                <View style={styles.oneCard}>
                  <View style={{ alignSelf: "center" }}>
                    <MaterialIcons
                      name="image-not-supported"
                      size={70}
                      color={"gray"}
                      onPress={() => {
                        setMainHomepage(true);
                        setDefaultMainCat(item);
                      }}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: "center",
                      }}
                    >
                      {item.categoryName}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
  },
  categoriesInner: {
    width: "90%",
    height: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  oneCard: {
    margin: 5,
    padding: 3,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    flexDirection: "column",
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default HomepageOne;
