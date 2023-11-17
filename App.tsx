import React from "react";
import "react-native-gesture-handler";
import LoginPage from "./Screens/LoginPage";
import { AuthProvider } from "./Context/AuthContext";

function App(): React.FC {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}

export default App;
