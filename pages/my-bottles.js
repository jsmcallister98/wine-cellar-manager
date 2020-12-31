/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useEffect } from 'react'
import { Box, Grid, Flex, Button, useColorMode } from 'theme-ui';

const BottlesPage = () => {

  const [bottles, setBottles] = useState();

  useEffect(() => {
    handleBottlesSearch();
  }, []);

  const handleBottlesSearch = async () => {
    const res = await fetch("/api/bottles", {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    });
    const bottles = await res.json();
    setBottles(bottles)
    };

  return (
    <Flex>
      <div>Bottles page</div>
      {bottles && bottles.map((bottle) => (
        <Box sx={{background: "#520101", width: "100px", height: "100px"}}>
          {bottle.name}
        </Box>
      ))}
    </Flex>
  )
}

export default BottlesPage;