import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useState } from "react";

const Header = () => {
  const { toggleAuth, isAdmin, isUser, toggleUser } = useContext(AuthContext);
  const [language, setLanguage] = useState("English");
  const handleclick = () => {
    if (isAdmin) {
      toggleAuth();
    } else if (isUser) {
      sessionStorage.clear();
      toggleUser();
    }
  };

  return (
    <>
      <Flex
        bg="#b19d9e"
        flexDirection="row-reverse"
        gap="20px"
        p="10px"
        alignItems="center"
      >
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
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="none">
            {language}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setLanguage("English")}>English</MenuItem>
            <MenuItem onClick={() => setLanguage("Hindi")}>Hindi</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default Header;
