import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function SearchHome({ navigation, setMainHomepage }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <Text>Arama</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const Stack = createNativeStackNavigator();
export default function Search({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchHome"
        component={SearchHome}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
