import React from "react";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isUser, setIsUser] = React.useState(false);
  const toggleAuth = () => {
    setIsAdmin(!isAdmin);
  };

  const toggleUser = () => {
    setIsUser(!isUser);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, toggleAuth, toggleUser, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
