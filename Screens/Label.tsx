import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function LabelHome({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <Text>Etiket</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const Stack = createNativeStackNavigator();
export default function Label({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LabelHome"
        component={LabelHome}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
