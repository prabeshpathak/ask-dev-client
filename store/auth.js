import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ childer }) => {
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    const expiresAt = localStorage.getItem("expiresAt");

    setAuthState({
      token,
      expiresAt,
      userInfo: userInfo ? JSON.parse(userInfo) : {},
    });
  }, []);

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);

    setAuthState({
      token,
      userInfo,
      expiresAt,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");
    setAuthState({});
  };

  const isAuthenticated = () => {
    if (!authState || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };
  const isAdmin = () => {
    return authState.userInfo.role === "admin";
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {childer}
    </Provider>
  );
};


export {AuthContext, AuthProvider}