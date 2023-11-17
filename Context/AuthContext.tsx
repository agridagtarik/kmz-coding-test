import React, { createContext, useState } from "react";
import axios from "axios";
import Loading from "../Components/Loading";
import { MyAlert } from "../Components/MyAlert";

export type AuthContextData = {
  handleLogin: (userName: string, pwd: string) => Promise<void>;
  userData: { [key: string]: any };
  isAuthenticated: boolean;
  setIsAuthenticated: (newValue: boolean) => void;
  setUserData: (userData: { [key: string]: any }) => void;
  defaultMainCat?: string;
  setDefaultMainCat: (defaultMainCat: object) => void;
  mainHomepage?: boolean;
  setMainHomepage: (mainHomepage: boolean) => void;
  children?: Element;
};

export const AuthContext = createContext<AuthContextData>(undefined);

export const AuthProvider = ({
  children,
}: React.PropsWithChildren<AuthContextData>) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<AuthContextData["userData"]>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultMainCat, setDefaultMainCat] = useState<string | undefined>(
    undefined
  );
  const [mainHomepage, setMainHomepage] = useState<boolean>(false);

  const handleLogin = async (userName: string, pwd: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://apiv5.akilliticaretim.com/api/v5/sf/auth/login",
        {
          username: userName,
          password: pwd,
        },
        {
          headers: {
            GUID: "24BE-DB0E-D75E-4060",
            "Content-Type": "application/json ",
          },
        }
      );

      if (response.data.status === true) {
        setIsAuthenticated((isAuthenticated) => !isAuthenticated);
        setUserData(response.data.data);
      } else {
        MyAlert("Giriş başarısız", "Kullanıcı adı ya da parola yanlıştır.");
      }
    } catch (error) {
      console.error(error);
      MyAlert("Giriş başarısız", "Lütfen daha sonra tekrar deneyiniz...");
    } finally {
      setLoading(false);
    }
  };
  console.log(mainHomepage, "ss");

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        userData,
        isAuthenticated,
        setIsAuthenticated,
        setUserData,
        defaultMainCat,
        setDefaultMainCat,
        mainHomepage,
        setMainHomepage,
      }}
    >
      {loading ? (
        <Loading text={"Giriş yapılıyor lütfen bekleyiniz."} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
