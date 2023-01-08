import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { url } from "../config/api";

const initialState = {
  name: "",
  email: "",
  password: "",
  religion: "",
  gender: "",
  age: "",
};

const Register = () => {
  const [user, setUser] = useState(initialState);
  const [userPhoto, setUserPhoto] = useState({ photo: "" });
  const [userAadhar, setUserAadhar] = useState({ aadharCard: "" });

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // if (name == "photo" || name == "aadharCard") {
    //   //   upload(e.target.files[0], (val) => {
    //   //     // value = val;
    //   //     console.log(value, "Inner");
    //   //     setUser({ ...user, [name]: val });
    //   //     // console.log(val);
    //   //   });

    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       //   setPreviewImages((old) => [...old, reader.result]);
    //       console.log(reader.result, "EEEEE");
    //     }
    //   };

    //   reader.readAsDataURL(e.target.files[0]);
    // }

    // console.log(value, "outer");

    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    let { name } = e.target;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        if (name === "photo") {
          setUserPhoto(reader.result);
        } else {
          setUserAadhar(reader.result);
        }
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name !== "" && email !== "" && age !== "" && aadharCard !== "") {
      let data = { userPhoto, userAadhar, ...user };
      //   console.log(data);
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => alert("Registration successfull"))
        .catch(() => alert("Registration failed"));
    } else {
      alert("Please fill the details");
    }
  };

  const { name, email, photo, aadharCard, age } = user;

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
          placeholder="Name"
        />
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Email Id"
        />

        <FormLabel>Gender</FormLabel>
        <Select name="gender" onChange={handleInputChange}>
          <option>--Select--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
        <FormLabel>Age</FormLabel>
        <Input
          type="text"
          name="age"
          value={age}
          onChange={handleInputChange}
          placeholder="Age"
        />

        <FormLabel>Profession</FormLabel>
        <Select name="profession" onChange={handleInputChange}>
          <option>--Select--</option>
          <option value="Service">Service</option>
          <option value="Business">Business</option>
          <option value="Self Employed">Self Employed</option>
          <option value="Other">Others</option>
        </Select>
        <FormLabel>Religion</FormLabel>
        <Select name="religion" onChange={handleInputChange}>
          <option>--Select--</option>
          <option value="Hindu">Hindu</option>
          <option value="Islam">Islam</option>
          <option value="Sikhism">Sikhism</option>
          <option value="Christianity">Christianity</option>
        </Select>

        <FormLabel>Photo</FormLabel>
        <Input
          style={{ border: "none" }}
          type="file"
          name="photo"
          value={photo}
          onChange={handleFileChange}
        />
        <FormLabel>Aadhar Card</FormLabel>
        <Input
          type="file"
          style={{ border: "none" }}
          name="aadharCard"
          value={aadharCard}
          onChange={handleFileChange}
        />
        <Button
          mt={6}
          colorScheme="teal"
          //   isLoading={props.isSubmitting}
          type="Signup"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </Container>
  );
};

export default Register;
