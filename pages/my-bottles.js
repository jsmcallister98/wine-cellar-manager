/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useEffect } from 'react'
import { Box, Grid, Flex, Button, useColorMode } from 'theme-ui';
import { FaWineBottle } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { FcCalendar } from "react-icons/fc";
import { BiDollar } from "react-icons/bi";
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
      <Flex sx={{justifyContent: "center", mx: 3}}>
        <Grid gap={5} columns={[1, 2, 2, 3]}>
          {bottles && bottles.map((bottle) => (
            <Box 
              key={bottle._id} 
              sx={{background: "#fff", 
                   color: "#000",
                   width: "100%", 
                   height: "auto",
                   border: "2px solid grey",
                   borderRadius: '5px',
                   boxShadow: '5px 5px 4px 0px #8b1d1d'
                   }}
            >
              <Flex sx={{alignItems: 'center', justifyContent: 'space-around'}}>
                <FaWineBottle sx={ bottle.type == "Red" ? { fontSize: '3rem', m: 3, color: '#8b1d1d', background: '#fff' } :
                                   bottle.type == "White" ? { fontSize: '3rem', m: 3, color: '#fff', background: '#cfa669' } :
                                   bottle.type == "Rose" ? { fontSize: '3rem', m: 3, color: '#ffabca', background: '#fff' } :
                                   bottle.type == "Dessert" ? { fontSize: '3rem', m: 3, color: '#f59f9f', background: '#fff' } :
                                   bottle.type == "Sparkling" ? { fontSize: '3rem', m: 3, color: '#e3d38d', background: '#fff' } :
                                   null }/>
                <Box px={4} sx={{}}>
                  <h4 sx={{mb: 0}}>{bottle.name}</h4>
                  <p sx={{mt: 0}}>{bottle.type}</p>
                </Box>
              </Flex>
              <hr sx={{mx: 3}}/>
              <Box sx={{ paddingLeft: 20, paddingRight: 20,  }}>
                <Flex sx={{justifyContent: 'space-between'}}>
                  <p sx={{m: 0}}><TiLocation sx={{ fontSize: '1.2rem' }}/> {bottle.location}</p>
                  <p sx={{m: 0}}><FcCalendar sx={{ fontSize: '1.2rem' }}/> {bottle.year}</p>
                  <h4 sx={{m: 0}}>${bottle.price}</h4>
                </Flex>
                <p>This bottle is located in rack {bottle.rack} in position ({bottle.xPosition}, {bottle.yPosition}).</p>
              </Box>
            </Box>
          ))}
        </Grid>
      </Flex>
    </Box>
  )
}

export default BottlesPage;