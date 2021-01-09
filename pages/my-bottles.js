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
  const [user, { mutate }] = useUser();

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

  const handleBottleEdit = async (e, bottle) => {
    e.preventDefault();
    const updatedBottle = {
      _id: bottle._id,
      name: bottle.name,
      type: bottle.type,
      price: bottle.price,
      year: bottle.year,
      location: bottle.location,
      rack: bottle.rack,
      yPosition: e.currentTarget.row.value,
      xPosition: e.currentTarget.column.value,
      isBottle: true
    };
    const res = await fetch('/api/user/bottles', {
      method: 'PATCH',
      headers: { 
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedBottle),
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData,
        },
      });
      console.log(userData);
    }
    window.location.reload();
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
              bg='muted'
              sx={{
                   color: "#000",
                   width: "100%", 
                   height: "auto",
                   border: "2px solid grey",
                   borderRadius: '5px',
                   boxShadow: '5px 5px 4px 0px #8b1d1d'
                   }}
            >
              <Flex sx={{alignItems: 'center', justifyContent: 'space-around'}}>
                <FaWineBottle sx={ bottle.type == "Red" ? { fontSize: '3rem', m: 3, color: '#8b1d1d', background: 'muted' } :
                                   bottle.type == "White" ? { fontSize: '3rem', m: 3, color: '#fff', background: '#cfa669' } :
                                   bottle.type == "Rose" ? { fontSize: '3rem', m: 3, color: '#ff86e6', background: 'muted' } :
                                   bottle.type == "Dessert" ? { fontSize: '3rem', m: 3, color: '#4f0048', background: 'muted' } :
                                   bottle.type == "Sparkling" ? { fontSize: '3rem', m: 3, color: '#c99b57', background: 'muted' } :
                                   null }/>
                <Box px={4} sx={{}}>
                  <h4 sx={{mb: 0}}>{bottle.name}</h4>
                  <p sx={{mt: 0, fontWeight: '500'}}>{bottle.type}</p>
                </Box>
              </Flex>
              <hr sx={{mx: 3, background: '#000'}}/>
              <Box sx={{ paddingLeft: 20, paddingRight: 20,  }}>
                <Flex sx={{justifyContent: 'space-between'}}>
                  <p sx={{m: 0}}><TiLocation sx={{ fontSize: '1.2rem' }}/> {bottle.location}</p>
                  <p sx={{m: 0}}><FcCalendar sx={{ fontSize: '1.2rem' }}/> {bottle.year}</p>
                  <h4 sx={{m: 0}}>${bottle.price}</h4>
                </Flex>
                <p>This bottle is located in rack {bottle.rack} in position ({bottle.xPosition}, {bottle.yPosition}).</p>
              </Box>
              <form onSubmit={(e) => handleBottleEdit(e, bottle)}>
              <label htmlFor="row">
                <input 
                  type="text" 
                  id="row"
                  name="row"
                  placeholder="Row" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label htmlFor="column">
                <input 
                  type="text" 
                  id="column"
                  name="column"
                  placeholder="Column" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <Button sx={{cursor: 'pointer', width: 174}} bg='background' color='text' type="submit">
                Edit Bottle
              </Button>
            </form>
            </Box>
          ))}
        </Grid>
      </Flex>
    </Box>
  )
}

export default BottlesPage;