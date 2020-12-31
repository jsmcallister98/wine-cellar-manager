/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useEffect } from 'react'
import { Box, Grid, Flex, Button, useColorMode } from 'theme-ui';
import { useUser } from '../utils/hooks';

const BottlesPage = () => {
  const [user] = useUser();

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
    console.log(bottles)
    setBottles(bottles)
    };

  return (
    <Box>
      <div>
        
      </div>
      {bottles && bottles.map((bottle) => (
        <Box key={bottle._id} sx={{background: "#520101", width: "100px", height: "100px"}}>
          {bottle.name}
        </Box>
      ))}
    </Box>
  )
}

export default BottlesPage;