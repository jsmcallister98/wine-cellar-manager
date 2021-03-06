/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useEffect, useState, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Box, Grid, Flex, Button, useColorMode } from 'theme-ui';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import Head from 'next/head';
import { useUser } from "../utils/hooks";

const Cellar = () => {
  // color theme
  const [colorMode, setColorMode] = useColorMode();

  // opening/closing of sidebar
  const [active, setActive] = useState(false);

  // used when searching for a bottle
  const [fetchedBottles, setFetchedBottles] = useState();

  // ======================================================
  // interacting with mongodb
  // ======================================================
  const [user, { mutate }] = useUser();
  const { name, email, wineracks, bottles } = user || {};
  const [isUpdating, setIsUpdating] = useState(false);
  const [msg, setMsg] = useState({ message: '', isError: false });
  
  // post new rack
  const handleWinerackSubmit = async (e) => {
    e.preventDefault();
    const winerack = {
      label: e.currentTarget.label.value,
      rows: e.currentTarget.rows.value,
      columns: e.currentTarget.columns.value,
      bottles: [],
      isWinerack: true
    };
    const res = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(winerack),
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      setMsg({ message: 'Cellar updated' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  // post new bottle
  const handleNewBottleSubmit = async (e) => {
    e.preventDefault();
    const bottle = {
      name: e.currentTarget.name.value,
      type: e.currentTarget.type.value,
      price: e.currentTarget.price.value,
      year: e.currentTarget.year.value,
      location: e.currentTarget.location.value,
      rack: e.currentTarget.rack.value,
      yPosition: e.currentTarget.row.value,
      xPosition: e.currentTarget.column.value,
      isBottle: true
    };
    const res = await fetch('/api/user', {
      method: 'PATCH',
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
          ...userData,
        },
      });
      handleBottlesSearch();
      setMsg({ message: 'Cellar updated' });
      setTotal(Number(total) + Number(bottle.price))
      console.log(userData)
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  // get specific bottle
  const handleBottleSearch = async (e) => {
    e.preventDefault();
    const bottle = {
      param: e.currentTarget.search.value
    }
    const res = await fetch('/api/user/bottles', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(bottle),
    });
    const foundBottles = await res.json();
    console.log(foundBottles)
    setFetchedBottles(foundBottles)
  }

  // get all user bottles and total value of cellar on page load
  const [userBottles, setUserBottles] = useState([]);
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
    setUserBottles(bottles);
    return bottles;
    };

    // delete winerack
    const handleWinerackDelete = async (winerack) => {

      const res = await fetch('/api/user', {
        method: 'DELETE',
        headers: { 
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(winerack),
      });
      if (res.status === 200) {
        const userData = await res.json();
        mutate({
          user: {
            ...user,
            ...userData.user,
          },
        });
        winerack.bottles.map(async bottle => {
          await handleBottleDelete(bottle);
        });
      } else {
        setMsg({ message: await res.text(), isError: true });
      }
    }

    // delete bottle
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
        setTotal(Number(total) - Number(bottle.price));
      } else {
        setMsg({ message: await res.text(), isError: true });
      }
    }

  // edit bottle position
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

  return (
    <Box >
      <Head>
        <title>My Cellar</title>
      </Head>
      {!user && <p sx={{ textAlign: 'center', width: '100vw', minHeight: '100vh'}}>Please sign in to access your cellar.</p>}
      {user && <div sx={{ display: 'flex', minHeight: '100vh' }} id="CellarPage">
      <ProSidebar collapsed={active} sx={colorMode === 'default' ? { background: 'linear-gradient(0deg, #000000 0%, #520101 70%)', color: '#fff'} : 
          { background: 'linear-gradient(0deg, #eee2de 0%, #987b61 70%)', color: '#000'} }>
        <SidebarHeader sx={colorMode === 'default' ? { background: 'linear-gradient(180deg, #000000 0%, #520101 100%)'} : 
          { background: 'linear-gradient(180deg, #eee2de 0%, #987b61 100%)'} }>
          <FaIcons.FaAngleDoubleLeft sx={{color: 'text'}} onClick={() => setActive(true)} 
          className={active ? "close-icon active-side" : "close-icon"}/>
          <FaIcons.FaAngleDoubleRight sx={{color: 'text'}} onClick={() => setActive(false)}
          className={active ? "open-icon" : "open icon active-side"}/>
        </SidebarHeader>      
        <Menu iconShape="square">
          <MenuItem icon={<FaIcons.FaSearch />}>
            <form onSubmit={handleBottleSearch}>
              <label htmlFor="search">
                <input 
                  type="text" 
                  id="search"
                  name="search"
                  placeholder="Search By Name" 
                  sx={{width: "100%", p: 2, borderRadius: 3, border: '1px solid', color: '#000'}} 
                />
              </label>
            </form>
          </MenuItem>
          <SubMenu title="Add a Rack" icon={<FaIcons.FaBorderAll className="bottle-icon" />}>
          {msg.message ? <p style={{ color: msg.isError ? 'red' : '#0070f3', textAlign: 'center' }}>{msg.message}</p> : null}
            <form onSubmit={handleWinerackSubmit}>
              <label htmlFor="label">
                <input 
                  className="input"
                  type="text" 
                  id="label"
                  name="label"
                  placeholder="Winerack label"
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: '#000'}}
                />
              </label>
              <label htmlFor="rows">
                <input 
                  className="input"
                  type="text" 
                  id="rows"
                  name="rows"
                  placeholder="Rows" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: '#000'}} 
                />
              </label>
              <label htmlFor="columns">
                <input 
                  className="input"
                  type="text" 
                  id="columns"
                  name="columns"
                  placeholder="Columns" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: '#000'}} 
                />
              </label>
              <Button type="submit" sx={{border: '1px solid', cursor: 'pointer', width: 174}} bg='background' color='text' type="submit" name="create winerack">
                Create Winerack
              </Button>
            </form>
          </SubMenu>
          <SubMenu title="Add a Bottle" icon={<FaIcons.FaWineBottle className="bottle-icon" />}>
          {msg.message ? <p style={{ color: msg.isError ? 'red' : '#0070f3', textAlign: 'center' }}>{msg.message}</p> : null}
            <form onSubmit={handleNewBottleSubmit}>
              <label htmlFor="name">
                <input 
                  className="input"
                  type="text" 
                  id="name"
                  name="name"
                  placeholder="Name" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label className="input" htmlFor="type">
                <select
                  className="input"
                  type="select" 
                  id="type"
                  name="type"
                  placeholder="Wine Type" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', width: 174}}>
                    <option value="Red">Red</option>
                    <option value="White">White</option>
                    <option value="Rose">Rose</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Sparkling">Sparkling</option>
                </select>
              </label>
              <label htmlFor="price">
                <input 
                  className="input"
                  type="text" 
                  id="price"
                  name="price"
                  placeholder="Price" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label htmlFor="year">
                <input 
                  className="input"
                  type="text" 
                  id="year"
                  name="year"
                  placeholder="Year" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label htmlFor="location">
                <input 
                  className="input"
                  type="text" 
                  id="location"
                  name="location"
                  placeholder="Location" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label htmlFor="rack">
                <input 
                  className="input"
                  type="text"
                  id="rack"
                  name="rack" 
                  placeholder="Winerack" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}}
                />
              </label>
              <label htmlFor="column">
                <input 
                  className="input"
                  type="text" 
                  id="column"
                  name="column"
                  placeholder="Column" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label htmlFor="row">
                <input 
                  className="input"
                  type="text" 
                  id="row"
                  name="row"
                  placeholder="Row" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <Button sx={{ border: '1px solid', cursor: 'pointer', width: 174}} bg='background' color='text' type="submit" name="add bottle">
                Add Bottle
              </Button>
            </form>
          </SubMenu>
        </Menu>
      </ProSidebar>
      
      <div className="Cellar" sx={active ? {width: "calc(100% - 80px)"} :
                {width: "calc(100% - 250px)"}}>
      <div 
        className={"rack-container"}
        sx={{display: "flex",
          flexWrap: 'wrap',
          justifyContent: "space-evenly",
          width: "100%"}}
      >
        {user.wineracks && user.wineracks.map(winerack => (
          <div key={winerack.label} 
               sx={{ my: 'auto', 
                     maxWidth: `${winerack.columns.length * 48}px`,
                     minWidth: `${winerack.columns.length * 24}px` }}>
            <Flex className="rack" sx={{justifyContent: 'center', alignItems: 'center'}}>
              <h2 sx={{textAlign: "center"}}>
                {winerack.label}
              </h2>
              <Button 
                onClick={() => handleWinerackDelete(winerack)} 
                className="hide"
                bg='background' color='text'
                sx={{ cursor: "pointer", border: '2px solid #520101', height: 40, py: 0, ml: 3, display: 'none' }}>
                <FaIcons.FaTrashAlt sx={{ color: '#c10404', mb: '-1px' }} /> Delete
              </Button>
            </Flex>
            <Box bg='wood' sx={{ color: 'wood', ':hover': { border: '1px solid', p: 0 } }}>  
            {winerack.rows.map(row => (
              <Grid
                key={row}           
                sx={{
                  p: 1, 
                  gridTemplateColumns: `repeat(${winerack.columns.length}, minmax(20px, 1fr))`
                  
                }}
                columns={winerack.columns.length}
                gap={[1, 1, 2, 2]}
                bg='wood'
              >
                {winerack.columns.map(column => (
                <Flex 
                  key={column} 
                  sx={{justifyContent: 'center', 
                    alignItems: 'center', 
                    minWidth: 20,
                    minHeight: 20,
                    borderRadius: 3,
                    position: 'relative'
                  }} 
                    bg='background'
                >
                  {winerack == "" ? (
                    <Box 
                      className="bottle"
                      key={row + column} 
                      bg='background'
                      sx={ 
                        {
                          width: '2.5rem',
                          height: '2.5rem', 
                          borderRadius: '50%',
                        } 
                      }
                      >
                    </Box>
                  ) : 
                  user.bottles.map((bottle, index) => (
                    fetchedBottles && bottle.yPosition == row && bottle.xPosition == column && bottle.rack == winerack.label ? (
                      fetchedBottles.map(fetchedBottle => (
                        fetchedBottle.xPosition == column && fetchedBottle.yPosition == row && fetchedBottle.name == bottle.name ? (
                          <div                           
                          className="bottle"
                          key={bottle.name} 
                          sx={{maxWidth: '2.3rem', 
                          maxHeight: '2.3rem',
                          width: '100%',
                          height: '100%',
                          position: 'absolute', 
                          mx: '2px',
                          borderRadius: '50%',
                          }}
                            bg='#2bff96'>
                        <Box 
                          className="bottle"
                          key={bottle.name} 
                          sx={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute', 
                          borderRadius: '50%',
                          border: '2px solid #000',
                          zIndex: `calc(1000 + ${row * 100 - column})`}}
                            bg='#2bff96'
                        >
                        </Box> 
                          <Box 
                            className="hide"
                            bg="#fff"
                            color="#000"
                            sx={{zIndex: "100000", width: 150, position: "absolute",
                              margin: "-90px 0 0 20px", borderRadius: 5, 
                              border: "1px solid", p: 'auto'}}
                          >
                            <ul sx={{padding: "0 20px", mt: '5px', mb: 0}}>
                              <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                {bottle.name}
                              </li>
                              <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                {bottle.year}
                              </li>
                              <li sx={{ padding: "5px", fontSize: "0.8rem"}}>
                                {bottle.location}
                              </li>
                            </ul>
                              <form sx={{pl: 12, pb: '5px', zIndex: 11000, position: 'relative'}} className="editPos" onSubmit={(e) => handleBottleEdit(e, bottle)}>
                                <Button sx={{width: '90%', fontSize: '0.8rem', cursor: "pointer", border: '1px solid', mt: 2, py: 1, ':hover': { background: '#9e9e9e' } }} bg='background' color='text' type="submit">
                                  Move To:
                                </Button>
                                <label htmlFor="rack">
                                  <input 
                                    defaultValue={bottle.rack}
                                    type="text" 
                                    id="rack"
                                    name="rack"
                                    placeholder="Rack" 
                                    sx={{ p: 1, borderRadius: 3, mb: 2, border: '1px solid', width: '45%'}} 
                                  />
                                </label>
                                <label htmlFor="column">
                                  <input 
                                    type="text" 
                                    id="column"
                                    name="column"
                                    placeholder="Col" 
                                    sx={{ p: 1, borderRadius: 3, mb: 2, border: '1px solid', width: '45%'}} 
                                  />
                                </label>
                                <label htmlFor="row">
                                  <input 
                                    type="text" 
                                    id="row"
                                    name="row"
                                    placeholder="Row" 
                                    sx={{ p: 1, borderRadius: 3, mb: 2, border: '1px solid', width: '45%'}} 
                                  />
                                </label>
                                <Button 
                                  onClick={() => handleBottleDelete(bottle)}
                                  bg='background' color='text'
                                  sx={{width: '90%', fontSize: '0.8rem', cursor: "pointer", border: '1px solid', mt: 2, py: 1, ':hover': { background: '#9e9e9e' } }}>
                                  <FaIcons.FaTrashAlt sx={{ color: '#c10404', mb: '-1px' }} /> Delete
                                </Button>                                                            
                              </form>
                          </Box>
                          </div>
                        ) : 
                        (
                          <Box 
                          className="bottle"
                          key={bottle.name + '_'} 
                          sx={ 
                            bottle.type == "Red" ? 
                            {maxWidth: '2.2rem', 
                            maxHeight: '2.2rem',
                            width: '100%',
                            height: '100%',
                            position: 'absolute', 
                            mx: '2px',
                            borderRadius: '50%',
                            background: '#820101',
                            border: '2px solid #000'} :
                            bottle.type == "White" ? 
                            {maxWidth: '2.2rem', 
                            maxHeight: '2.2rem',
                            width: '100%',
                            height: '100%',
                            position: 'absolute', 
                            mx: '2px',
                            borderRadius: '50%',
                            background: '#fff',
                            border: '2px solid #000'} :
                            bottle.type == "Rose" ? 
                            {maxWidth: '2.2rem', 
                            maxHeight: '2.2rem',
                            width: '100%',
                            height: '100%',
                            position: 'absolute', 
                            mx: '2px',
                            borderRadius: '50%',
                            background: '#ffbeef',
                            border: '2px solid #000'} :
                            bottle.type == "Dessert" ?
                            {maxWidth: '2.2rem', 
                            maxHeight: '2.2rem',
                            width: '100%',
                            height: '100%',
                            position: 'absolute', 
                            mx: '2px',
                            borderRadius: '50%',
                            background: '#4f0048',
                            border: '2px solid #000'} :
                            bottle.type == "Sparkling" ? 
                            {maxWidth: '2.2rem', 
                            maxHeight: '2.2rem',
                            width: '100%',
                            height: '100%',
                            position: 'absolute', 
                            mx: '2px',
                            borderRadius: '50%',
                            background: '#c99b57',
                            border: '2px solid #000'} :
                            null
                          }
                        >
                            <Box 
                              className="hide"
                              bg="#fff"
                              color="#000"
                              sx={{zIndex: "100000", width: 150, position: "absolute",
                                margin: "-90px 0 0 20px", borderRadius: 5, 
                                border: "1px solid", p: 'auto'}}
                            >
                              <ul sx={{padding: "0 20px", mt: '5px', mb: 0}}>
                                <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                  {bottle.name}
                                </li>
                                <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                  {bottle.year}
                                </li>
                                <li sx={{ padding: "5px", fontSize: "0.8rem"}}>
                                  {bottle.location}
                                </li>
                              </ul>
                                <form sx={{pl: 12, pb: '5px'}} className="editPos" onSubmit={(e) => handleBottleEdit(e, bottle)}>
                                  <Button sx={{width: '90%', fontSize: '0.8rem', cursor: "pointer", border: '1px solid', mt: 2, py: 1, ':hover': { background: '#9e9e9e' } }} bg='background' color='text' type="submit">
                                    Move To:
                                  </Button>
                                  <label htmlFor="rack">
                                    <input 
                                      defaultValue={bottle.rack}
                                      type="text" 
                                      id="rack"
                                      name="rack"
                                      placeholder="Rack" 
                                      sx={{ p: 1, borderRadius: 3, mb: 2, border: '1px solid', width: '45%'}} 
                                    />
                                  </label>
                                  <label htmlFor="column">
                                    <input 
                                      type="text" 
                                      id="column"
                                      name="column"
                                      placeholder="Col" 
                                      sx={{ p: 1, borderRadius: 3, mb: 2, border: '1px solid', width: '45%'}} 
                                    />
                                  </label>
                                  <label htmlFor="row">
                                    <input 
                                      type="text" 
                                      id="row"
                                      name="row"
                                      placeholder="Row" 
                                      sx={{ p: 1, borderRadius: 3, mb: 2, border: '1px solid', width: '45%'}} 
                                    />
                                  </label>
                                  <Button 
                                    onClick={() => handleBottleDelete(bottle)}
                                    bg='background' color='text'
                                    sx={{width: '90%', fontSize: '0.8rem', cursor: "pointer", border: '1px solid', mt: 2, py: 1, ':hover': { background: '#9e9e9e' } }}>
                                    <FaIcons.FaTrashAlt sx={{ color: '#c10404', mb: '-1px' }} /> Delete
                                  </Button>                                                            
                                </form>
                            </Box>
                        </Box> 
                        )
                      ))
                    )
                    : 
                    ( !fetchedBottles && bottle.yPosition == row && bottle.xPosition == column && bottle.rack == winerack.label ? (
                          <Box 
                            className="bottle"
                            key={'_' + bottle.name} 
                            sx={ 
                              bottle.type == "Red" ? 
                              {maxWidth: '2.2rem', 
                              maxHeight: '2.2rem',
                              width: '100%',
                              height: '100%',
                              position: 'absolute', 
                              mx: '2px',
                              borderRadius: '50%',
                              background: '#820101',
                              border: '2px solid #000'} :
                              bottle.type == "White" ? 
                              {maxWidth: '2.2rem', 
                              maxHeight: '2.2rem',
                              width: '100%',
                              height: '100%',
                              position: 'absolute', 
                              mx: '2px',
                              borderRadius: '50%',
                              background: '#fff',
                              border: '2px solid #000'} :
                              bottle.type == "Rose" ? 
                              {maxWidth: '2.2rem', 
                              maxHeight: '2.2rem',
                              width: '100%',
                              height: '100%',
                              position: 'absolute', 
                              mx: '2px',
                              borderRadius: '50%',
                              background: '#ffbeef',
                              border: '2px solid #000'} :
                              bottle.type == "Dessert" ?
                              {maxWidth: '2.2rem', 
                              maxHeight: '2.2rem',
                              width: '100%',
                              height: '100%',
                              position: 'absolute', 
                              mx: '2px',
                              borderRadius: '50%',
                              background: '#4f0048',
                              border: '2px solid #000'} :
                              bottle.type == "Sparkling" ? 
                              {maxWidth: '2.2rem', 
                              maxHeight: '2.2rem',
                              width: '100%',
                              height: '100%',
                              position: 'absolute', 
                              mx: '2px',
                              borderRadius: '50%',
                              background: '#c99b57',
                              border: '2px solid #000'} :
                              null
                            }
                          >
                            <Box 
                              className="hide"
                              bg="#fff"
                              color="#000"
                              sx={{zIndex: "100000", width: 150, position: "absolute",
                                margin: "-90px 0 0 20px", borderRadius: 5, 
                                border: "1px solid", p: 'auto'}}
                            >
                              <ul sx={{padding: "0 20px", mt: '5px', mb: 0}}>
                                <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                  {bottle.name}
                                </li>
                                <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                  {bottle.year}
                                </li>
                                <li sx={{ padding: "5px", fontSize: "0.8rem"}}>
                                  {bottle.location}
                                </li>
                              </ul>
                                <form sx={{pl: 12, pb: '5px'}} className="editPos" onSubmit={(e) => handleBottleEdit(e, bottle)}>
                                  <Button sx={{width: '90%', fontSize: '0.8rem', cursor: "pointer", border: '1px solid', mt: 2, py: 1, ':hover': { background: '#9e9e9e' } }} bg='background' color='text' type="submit">
                                    Move To:
                                  </Button>
                                  <label htmlFor="rack">
                                    <input 
                                      defaultValue={bottle.rack}
                                      type="text" 
                                      id="rack"
                                      name="rack"
                                      placeholder="Rack" 
                                      sx={{ p: 1, borderRadius: 3, mb: 2, border: '1px solid', width: '30%'}} 
                                    />
                                  </label>
                                  <label htmlFor="column">
                                    <input 
                                      type="text" 
                                      id="column"
                                      name="column"
                                      placeholder="Col" 
                                      sx={{ p: 1, borderRadius: 3, mb: 2, border: '1px solid', width: '30%'}} 
                                    />
                                  </label>
                                  <label htmlFor="row">
                                    <input 
                                      type="text" 
                                      id="row"
                                      name="row"
                                      placeholder="Row" 
                                      sx={{ p: 1, borderRadius: 3, mb: 2, border: '1px solid', width: '30%'}} 
                                    />
                                  </label>
                                  <Button 
                                    onClick={() => handleBottleDelete(bottle)}
                                    bg='background' color='text'
                                    sx={{width: '90%', fontSize: '0.8rem', cursor: "pointer", border: '1px solid', mt: 2, py: 1, ':hover': { background: '#9e9e9e' } }}>
                                    <FaIcons.FaTrashAlt sx={{ color: '#c10404', mb: '-1px' }} /> Delete
                                  </Button>                                                            
                                </form>
                            </Box>
                          </Box> 
                          ) : (
                            index === 0 ? (
                              <Box 
                              className="bottle"
                              key={bottle.name + '__'} 
                              bg='background'
                              sx={ 
                                {
                                  width: '2.5rem',
                                  height: '2.5rem', 
                                  borderRadius: '50%',
                                } 
                              }
                              >
                          </Box> ) :
                          (
                            null
                          )
                        )
                      )
                    )
                  )}
                </Flex>
                ))}
              </Grid>
            ))}
            </Box>
          </div>
        ))}
      </div>
      </div>
      </div>}
    </Box>
  )
}


export default Cellar