import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../config/api";
import { useTranslation } from "react-i18next";

const initialState = {
  name: "",
  email: "",

  religion: "",
  gender: "",
  age: "",
  accept: "",
  deny: "",
};

const Register = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(initialState);
  const [userPhoto, setUserPhoto] = useState({ photo: "" });
  const [userAadhar, setUserAadhar] = useState({ aadharCard: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    let { name } = e.target;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        if (name === "photo") {
          setUserPhoto({ photo: reader.result });
        } else {
          setUserAadhar({ aadharCard: reader.result });
        }
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name !== "" &&
      email !== "" &&
      age !== "" &&
      userAadhar.aadharCard !== ""
    ) {
      let data = { userPhoto, userAadhar, ...user };

      console.log(data);
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          alert("Registration successfull");
          setUser(initialState);
          setUserPhoto({ photo: "" });
          setUserAadhar({ aadharCard: "" });
          navigate("/dashboard");
        })
        .catch(() => alert("Registration failed"));
    } else {
      alert("Please fill the details");
    }
  };

  const { name, email, age, gender, profession, religion, photo, aadharCard } =
    user;

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
      <Text>{t("REGISTRATION FORM")}</Text>
      <FormControl isRequired>
        <FormLabel>{t("Name")}</FormLabel>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <FormLabel>{t("Email")}</FormLabel>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Email Id"
        />

        <FormLabel>{t("Gender")}</FormLabel>
        <Select name="gender" value={gender} onChange={handleInputChange}>
          <option>--{t("Select")}--</option>
          <option value="Male">{t("Male")}</option>
          <option value="Female">{t("Female")}</option>
        </Select>
        <FormLabel>{t("Age")}</FormLabel>
        <Input
          type="text"
          name="age"
          value={age}
          onChange={handleInputChange}
          placeholder="Age"
        />

        <FormLabel>{t("Profession")}</FormLabel>
        <Select
          name="profession"
          value={profession}
          onChange={handleInputChange}
        >
          <option>--{t("Select")}--</option>
          <option value="Service">{t("Service")}</option>
          <option value="Business">{t("Business")}</option>
          <option value="Self Employed">{t("Self Employed")}</option>
          <option value="Other">{t("Others")}</option>
        </Select>
        <FormLabel>{t("Religion")}</FormLabel>
        <Select name="religion" value={religion} onChange={handleInputChange}>
          <option>--{t("Select")}--</option>
          <option value="Hindu">{t("Hindu")}</option>
          <option value="Islam">{t("Islam")}</option>
          <option value="Sikhism">{t("Sikhism")}</option>
          <option value="Christianity">{t("Christianity")}</option>
        </Select>

        <FormLabel>{t("Photo")}</FormLabel>
        <Input
          style={{ border: "none" }}
          type="file"
          name="photo"
          value={photo}
          onChange={handleFileChange}
        />
        <FormLabel>{t("Aadhar Card")}</FormLabel>
        <Input
          type="file"
          style={{ border: "none" }}
          name="aadharCard"
          value={aadharCard}
          onChange={handleFileChange}
        />
        <Button mt={6} colorScheme="teal" type="Signup" onClick={handleSubmit}>
          {t("Submit")}
        </Button>
      </FormControl>
    </Container>
  );
};

export default Register;
