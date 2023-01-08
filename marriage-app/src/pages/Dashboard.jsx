import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { url } from "../config/api";
import { AuthContext } from "../context/AuthContextProvider";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { isAdmin } = useContext(AuthContext);

  const getData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
    // console.log(data);
  }, []);

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
                  //   h="300px"
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
                    <Text as="b">Profession : {elem.profession}</Text>
                    <Text as="b">Age : {elem.age}</Text>
                    <Text as="b">Gender : {elem.gender}</Text>
                  </VStack>

                  {isAdmin ? (
                    <Flex justifyContent="space-around" m="5px">
                      <Button colorScheme="teal">Approve</Button>
                      <Button colorScheme="red">Deny</Button>
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
