import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Skeleton,
  Textarea,
  FormErrorMessage,
  Table,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { url } from "../config/api";
import { AuthContext } from "../context/AuthContextProvider";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const { isUser, isAdmin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const [reason, setReason] = React.useState("");
  const [error, setError] = React.useState(false);
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [aadharUrl, setAadharUrl] = React.useState("");
  const navigate = useNavigate();

  const getData = () => {
    setIsLoading(true);
    fetch(`${url}/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setPhotoUrl(res.userPhoto.photo);
        setAadharUrl(res.userAadhar.aadharCard);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  //   console.log(data, "HRY");

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setReason(inputValue);
  };

  const handleApprove = (elem) => {
    let updatedData = { ...elem, accept: reason, deny: "" };

    // console.log(updatedData, "HEY ");
    fetch(`${url}/${elem.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        alert("Profile approved!");
        return navigate("/dashboard");
      })
      .catch(() => alert("Failed updation"));
  };

  const handleReject = (elem) => {
    let updatedData = { ...elem, deny: reason, accept: "" };
    // console.log(updatedData);
    fetch(`${url}/${elem.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        alert("Profile rejected!");
        return navigate("/dashboard");
      })
      .catch(() => alert("Failed"));
  };

  if (error) {
    return <FormErrorMessage>Something went wrong</FormErrorMessage>;
  }

  if (isLoading) {
    return (
      <Box m="5px">
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <Box
          m="10px"
          borderWidth="2px"
          borderRadius="md"
          border="1px solid rgba(0, 0, 0, 0.30)"
          overflow="hidden"
        >
          <SimpleGrid
            columns={[1, 2, 2, 2]}
            borderBottom="1px solid rgba(0, 0, 0, 0.30)"
            position="relative"
            margin="2px"
            width="100%"
            justifyContent="center"
            gap="5px"
          >
            <Image
              height="400px"
              src={
                photoUrl === "undefined"
                  ? "https://www.w3schools.com/howto/img_avatar.png"
                  : photoUrl
              }
              alt="User photo"
              borderRadius="8px"
            />
            <Image
              height="400px"
              src={
                aadharUrl === "undefined"
                  ? "https://www.shutterstock.com/image-vector/dummy-aadhar-card-unique-identity-600w-1661857771.jpg"
                  : aadharUrl
              }
              alt="Aadhar image"
              borderRadius="8px"
            />
          </SimpleGrid>
          <SimpleGrid columns={[1, 2, 2, 2]}>
            <VStack>
              <Table width="90%">
                <Tbody>
                  <Tr>
                    <Td>Name</Td>
                    <Td>{data.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Age</Td>
                    <Td>{data.age}</Td>
                  </Tr>
                  <Tr>
                    <Td>Profession</Td>
                    <Td>{data.profession}</Td>
                  </Tr>
                  <Tr>
                    <Td>Gender</Td>
                    <Td>{data.gender}</Td>
                  </Tr>
                  <Tr>
                    <Td>Religion</Td>
                    <Td>{data.religion}</Td>
                  </Tr>
                </Tbody>
              </Table>

              {isUser ? (
                data.accept !== "" ? (
                  <Text color="teal">{data.accept}✅</Text>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              {isUser ? (
                data.deny !== "" ? (
                  <Text color="red">{data.deny}</Text>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </VStack>
            <Box>
              <Textarea
                value={reason}
                onChange={handleInputChange}
                placeholder="Type here..."
                height="180px"
                mt="10px"
              />
              {isAdmin ? (
                <Flex justifyContent="space-around" m="20px">
                  <Button
                    colorScheme="green"
                    onClick={() => {
                      handleApprove(data);
                    }}
                  >
                    {t("Approve")}
                  </Button>
                  <Button
                    disabled={data.accept !== ""}
                    colorScheme="red"
                    onClick={() => handleReject(data)}
                  >
                    {t("Deny")}
                  </Button>
                </Flex>
              ) : (
                ""
              )}
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
