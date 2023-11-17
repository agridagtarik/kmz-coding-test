import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function ProfileHome({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <Text>Profil</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const Stack = createNativeStackNavigator();
export default function Profile({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
