import { Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Flex bg="#b19d9e" flexDirection="row-reverse" gap="20px" p="10px">
        <Link to="/">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/register">Registration</Link>
      </Flex>
    </>
  );
};

export default Header;
