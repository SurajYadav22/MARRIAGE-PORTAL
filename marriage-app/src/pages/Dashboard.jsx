import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { url } from "../config/api";
import { AuthContext } from "../context/AuthContextProvider";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const { isUser, isAdmin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
    // console.log(data);
  }, []);

  if (isLoading) {
    return (
      <Box m="px">
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="20px">
          <Skeleton height="250px" width="250px" />
          <Skeleton height="250px" width="250px" />
          <Skeleton height="250px" width="250px" />
          <Skeleton height="250px" width="250px" />
          <Skeleton height="250px" width="250px" />
          <Skeleton height="250px" width="250px" />
          <Skeleton height="250px" width="250px" />
          <Skeleton height="250px" width="250px" />
        </SimpleGrid>
      </Box>
    );
  }

  return (
    <Box>
      <Box m="10px">
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="20px">
          {/* {console.log(data)} */}
          {data &&
            data.map((elem) => {
              return (
                <Box
                  key={elem.id}
                  width="100%"
                  borderWidth="2px"
                  borderRadius="md"
                  border="1px solid rgba(0, 0, 0, 0.30)"
                  overflow="hidden"
                >
                  <Flex
                    position="relative"
                    height="160px"
                    margin="3px"
                    justifyContent="center"
                  >
                    <Image
                      height="160px"
                      src={elem.userPhoto.photo}
                      alt="profile"
                    />
                  </Flex>

                  <VStack>
                    <Text as="b">Name : {elem.name}</Text>
                    <Text as="b">Age : {elem.age}</Text>
                    <Text as="b">Profession : {elem.profession}</Text>
                    <Text as="b">Gender : {elem.gender}</Text>
                    <Text as="b">Religion : {elem.religion}</Text>
                    {isUser ? (
                      elem.accept !== "" ? (
                        <Text color="teal">{elem.accept}✅</Text>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}

                    {isUser ? (
                      elem.deny !== "" ? (
                        <Text color="red">{elem.deny}</Text>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </VStack>

                  {isAdmin ? (
                    <Flex justifyContent="space-around" m="5px">
                      <Link to={`/profile/${elem.id}`}>
                        <Button colorScheme="green">{t("Approve")}</Button>
                      </Link>
                      <Link to={`/profile/${elem.id}`}>
                        <Button disabled={elem.accept !== ""} colorScheme="red">
                          {t("Deny")}
                        </Button>
                      </Link>
                    </Flex>
                  ) : (
                    ""
                  )}
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;
