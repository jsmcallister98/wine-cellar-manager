/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useEffect } from 'react'
import { Box, Grid, Flex, Button, useColorMode, Divider } from 'theme-ui';
import { FaWineBottle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { FcCalendar } from "react-icons/fc";
import { useUser } from '../utils/hooks';
import Head from 'next/head';

const BottlesPage = () => {
  const [user, { mutate }] = useUser();

  const [bottles, setBottles] = useState();
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    if (user) {
      const bottles = await handleBottlesSearch();
      let totalPrice = 0
      await bottles.forEach(bottle => {
        totalPrice += bottle.price
        console.log(totalPrice)
      }) 
      setTotal(totalPrice);
    }
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
    setBottles(bottles);
    return bottles;
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
      rack: e.currentTarget.rack.value,
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
    handleBottlesSearch();
  };

  const handleBottleDelete = async (bottle) => {
    const res = await fetch('/api/user', {
      method: 'DELETE',
      headers: { 
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(bottle),
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
    } 
    handleBottlesSearch();
  }

  const handlePriceSort = async () => {
    await bottles.sort((a, b) => (a.price > b.price) ? 1 : -1);
    console.log(bottles);
    setBottles([...bottles]);
  }

  const handleYearSort = async () => {
    await bottles.sort((a, b) => (a.year > b.year) ? 1 : -1);
    console.log(bottles);
    setBottles([...bottles]);
  }

  const handleTypeSort = async () => {
    await bottles.sort((a, b) => (a.type > b.type) ? 1 : -1);
    console.log(bottles);
    setBottles([...bottles]);
  }

  const handleLocationSort = async () => {
    await bottles.sort((a, b) => (a.location.toLowerCase() > b.location.toLowerCase()) ? 1 : -1);
    console.log(bottles);
    setBottles([...bottles]);
  }

  const handleNameSort = async () => {
    await bottles.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    console.log(bottles);
    setBottles([...bottles]);
  }

  const handleRackSort = async () => {
    await bottles.sort((a, b) => (a.rack.toLowerCase() > b.rack.toLowerCase()) ? 1 : -1);
    console.log(bottles);
    setBottles([...bottles]);
  }

  return (
    <Box sx={{minHeight: '100vh', mb: 7}}>
      <Head>
        <title>My Bottles</title>
      </Head>
      {!user && <p sx={{ textAlign: 'center', width: '100vw'}}>Please sign in to access your bottles.</p>}
      {user && <div>
      <Flex sx={{m: 4, alignItems: 'center', ml: 70}}>
        <div sx={{ my: 'auto'}} className="dropdown dropdown-6">
          <Flex sx={{alignItems: 'center'}}>
            <h5>Sort By:</h5>
          </Flex>
          <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-6">
            <li 
              onClick={() => handlePriceSort()} 
              className="dropdown_item-1"
              sx={{bg: 'primary', color: "#fff"}}>
              Price
            </li>
            <li 
              onClick={() => handleYearSort()} 
              className="dropdown_item-2"
              sx={{bg: 'primary', color: "#fff"}}>
              Year
            </li>
            <li 
              onClick={() => handleTypeSort()} 
              className="dropdown_item-3"
              sx={{bg: 'primary', color: "#fff"}}>
              Type
            </li>
            <li 
              onClick={() => handleLocationSort()} 
              className="dropdown_item-4"
              sx={{bg: 'primary', color: "#fff"}}>
              Location
            </li>
            <li 
              onClick={() => handleNameSort()} 
              className="dropdown_item-5"
              sx={{bg: 'primary', color: "#fff"}}>
              Name
            </li>
            <li 
              onClick={() => handleRackSort()} 
              className="dropdown_item-6"
              sx={{bg: 'primary', color: "#fff"}}>
              Rack
            </li>
          </ul>
        </div>
        <p sx={{ fontWeight: '500', ml: 30 }}>Collection Value: ${total}</p>
      </Flex>
      <Flex sx={{justifyContent: "center", mx: 3}}>
        <Grid gap={5} columns={[1, 2, 2, 3, 3, 3, 4]}>
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
              <Divider sx={{mx: 3, color: '#000'}}/>
              <Box sx={{ paddingLeft: 20, paddingRight: 20,  }}>
                <Flex sx={{justifyContent: 'space-between'}}>
                  <p sx={{m: 0}}><TiLocation sx={{ fontSize: '1.2rem' }}/> {bottle.location}</p>
                  <p sx={{m: 0}}><FcCalendar sx={{ fontSize: '1.2rem' }}/> {bottle.year}</p>
                  <h4 sx={{m: 0}}>${bottle.price}</h4>
                </Flex>
                <p>This bottle is located in rack {bottle.rack} in position ({bottle.xPosition}, {bottle.yPosition}).</p>
              </Box>
              <Flex sx={{justifyContent: 'space-around'}}>
                <div>
                <Button className="editPosition" sx={{cursor: 'pointer', border: '1px solid #520101', mb: 2}} bg='background' color='text' type="button">
                  Edit Position <FaCaretDown />
                </Button>
                <form sx={{border: '1px solid', borderRadius: '0 0 5px 5px', width: 143, p: 2, position: 'absolute', background: '#fff', mt: '-10px'}} className="hide" onSubmit={(e) => handleBottleEdit(e, bottle)}>
                  <label htmlFor="rack">
                    <input 
                      type="text" 
                      id="rack"
                      name="rack"
                      placeholder="Rack" 
                      defaultValue={bottle.rack}
                      sx={{width: '60%', p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                    />
                  </label>
                  <label htmlFor="column">
                    <input 
                      type="text" 
                      id="column"
                      name="column"
                      placeholder="Column" 
                      sx={{width: '60%', p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                    />
                  </label>
                  <br/>
                  <label htmlFor="row">
                    <input 
                      type="text" 
                      id="row"
                      name="row"
                      placeholder="Row" 
                      sx={{width: '60%', p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                    />
                  </label>
                  <br/>
                  <Button sx={{width: '60%', p: 1, cursor: 'pointer', border: '1px solid #520101'}} bg='background' color='text' type="submit">
                    Move 
                  </Button>
                </form>
                </div>
                <Button onClick={() => handleBottleDelete(bottle)} sx={{height: 42, width: 101, cursor: 'pointer', border: '1px solid #520101'}} bg='background' color='text' type="button">
                  <FaTrashAlt sx={{ color: '#c10404', mb: '-1px' }} /> Delete
                </Button>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Flex>
      </div>}
    </Box>
  )
}

export default BottlesPage;