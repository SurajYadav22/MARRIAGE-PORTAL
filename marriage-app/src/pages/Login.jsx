import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url2 } from "../config/api";
import { AuthContext } from "../context/AuthContextProvider";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const { toggleAuth, toggleUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      if (email === "admin@gmail.com" && password === "Admin@123") {
        alert("Welcome to admin pannel!");
        toggleAuth();
        return navigate("/dashboard");
      } else {
        fetch(url2)
          .then((res) => res.json())
          .then((res) => {
            // console.log(res);
            // console.log(res, " check res in 41");
            let user_name = "";
            let isAvailable = res.filter((el) => {
              user_name = el.name;
              return el.email === user.email && el.password === user.password;
            });

            if (isAvailable.length !== 0) {
              alert("Login successful");
              sessionStorage.setItem("user", JSON.stringify(user_name));
              toggleUser();

              return navigate("/register");
            } else {
              alert("User does not exist!");
            }
          })
          .catch(() => alert("Login failed"));
      }
    } else {
      alert("Please fill the details");
    }
  };

  const { email, password } = user;

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
          onClick={handleLogin}
        >
          Login
        </Button>
        <br />
        <br />

        <Link to="/signup">Create an account</Link>
      </FormControl>
    </Container>
  );
};

export default Login;
