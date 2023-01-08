import { Box, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { url } from "../config/api";
const Dashboard = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  return (
    <Container>
      <Box>
        <h1>Dashboard</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        {/* <img src="" /> */}
      </Box>
    </Container>
  );
};

export default Dashboard;
