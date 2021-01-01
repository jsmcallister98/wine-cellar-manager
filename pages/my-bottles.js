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
      <div sx={{m: 4}}>
        Sort By: 
      </div>
      <Flex sx={{justifyContent: "center"}}>
        <Grid gap={5} columns={3}>
          {bottles && bottles.map((bottle) => (
            <Box 
              key={bottle._id} 
              sx={{background: "#fff", 
                   width: "100%", 
                   height: "auto",
                   border: "2px solid #8b1d1d",
                   borderRadius: 10
                   }}
            >
              <ul sx={{ paddingLeft: 20, paddingRight: 20 }}>
                <li>Name: {bottle.name}</li>
                <li>Location: {bottle.location}</li>
                <li>Year: {bottle.year}</li>
                <li>Type: {bottle.type}</li>
                <li>Rack: {bottle.rack}</li>
              </ul>
            </Box>
          ))}
        </Grid>
      </Flex>
    </Box>
  )
}

export default BottlesPage;