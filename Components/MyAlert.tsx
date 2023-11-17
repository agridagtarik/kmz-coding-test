import { Alert } from "react-native";

export type AlertData = {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

export const MyAlert = (
  title: string,
  message: string,
  onPressCallback?: () => void
) => {
  const alertOptions: AlertData = {
    text: "Tamam",
    onPress: onPressCallback || (() => {}),
    style: "default",
  };

  Alert.alert(title, message, [alertOptions], { cancelable: false });
};
