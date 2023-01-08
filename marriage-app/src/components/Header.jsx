import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

const Header = () => {
  const { toggleAuth, isAdmin, isUser, toggleUser } = useContext(AuthContext);

  const handleclick = () => {
    if (isAdmin) {
      toggleAuth();
    } else if (isUser) {
      sessionStorage.clear();
      toggleUser();
    }
  };

  //   useEffect(() => {
  //     let user_name = sessionStorage.getItem("user") || "";
  //     setUser(user_name);
  //   }, []);

  return (
    <>
      <Flex bg="#b19d9e" flexDirection="row-reverse" gap="20px" p="10px">
        {isAdmin || isUser ? (
          <Link to="/" onClick={handleclick}>
            Logout
          </Link>
        ) : (
          ""
        )}
        <Link to="/">
          {isAdmin ? "Admin" : JSON.parse(sessionStorage.getItem("user")) || ""}
        </Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/register">Registration</Link>
      </Flex>
    </>
  );
};

export default Header;
