import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../config/api";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Home = () => {
  const [user, setUser] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => alert("Signup successfull"))
        .catch(() => alert("Signup failed"));
    } else {
      alert("Please fill the details");
    }
  };

  const { name, email, password } = user;

  return (
    <Container
      width="60%"
      m="auto"
      //   border="1px solid gray"
      p="15px"
      mt="15px"
      borderRadius="5px"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      rounded="md"
      bg="white"
    >
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <Button
          mt={6}
          colorScheme="teal"
          //   isLoading={props.isSubmitting}
          type="Signup"
          onClick={handleSignup}
        >
          Sign up
        </Button>
        <br />
        <br />

        <Link to="/">Already have an account</Link>
      </FormControl>
    </Container>
  );
};

export default Home;
