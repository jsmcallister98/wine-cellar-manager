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
  // posting data to mongodb
  // ======================================================
  const [user, { mutate }] = useUser();
  const { name, email, wineracks, bottles, cellars } = user || {};
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
          ...userData.user,
        },
      });
      setMsg({ message: 'Cellar updated' });
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

  return (
    <Flex id="CellarPage">
      <Head>My Wine Cellar</Head>
      
      <ProSidebar collapsed={active} sx={colorMode === 'default' ? { background: '#520101', color: '#fff'} : 
          { background: '#987b61', color: '#000'} }>
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
                  placeholder="Search" 
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
                  type="text" 
                  id="label"
                  name="label"
                  placeholder="Winerack label"
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: '#000'}}
                />
              </label>
              <label htmlFor="rows">
                <input 
                  type="text" 
                  id="rows"
                  name="rows"
                  placeholder="Rows" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: '#000'}} 
                />
              </label>
              <label htmlFor="columns">
                <input 
                  type="text" 
                  id="columns"
                  name="columns"
                  placeholder="Columns" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: '#000'}} 
                />
              </label>
              <Button 
                disabled={isUpdating}
                type="submit"
                sx={{cursor: 'pointer', width: 174}} bg='background' color='text' type="submit">
                Create Winerack
              </Button>
            </form>
          </SubMenu>
          <SubMenu title="Add a Bottle" icon={<FaIcons.FaWineBottle className="bottle-icon" />}>
          {msg.message ? <p style={{ color: msg.isError ? 'red' : '#0070f3', textAlign: 'center' }}>{msg.message}</p> : null}
            <form onSubmit={handleNewBottleSubmit}>
              <label htmlFor="name">
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  placeholder="Winery" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label htmlFor="type">
                <input 
                  type="text" 
                  id="type"
                  name="type"
                  placeholder="Wine Type" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label htmlFor="year">
                <input 
                  type="text" 
                  id="year"
                  name="year"
                  placeholder="Year" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label htmlFor="location">
                <input 
                  type="text" 
                  id="location"
                  name="location"
                  placeholder="Location" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}} 
                />
              </label>
              <label htmlFor="rack">
                <input 
                  type="text"
                  id="rack"
                  name="rack" 
                  placeholder="Winerack" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid'}}
                />
              </label>
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
                Add Bottle
              </Button>
            </form>
          </SubMenu>
          <SubMenu title="My Racks" icon={<FaIcons.FaBorderAll className="bottle-icon" />}>
            {wineracks && wineracks.map(winerack => (
              <MenuItem key={winerack._id + "_"}>{winerack.label}</MenuItem> 
            ))}
          </SubMenu>
          <SubMenu title="My Bottles" icon={<FaIcons.FaWineBottle className="bottle-icon" />}>
            {bottles && bottles.map(bottle => (
              <MenuItem key={bottle._id + "_"}>{bottle.name}</MenuItem>
              ))}
          </SubMenu>
        </Menu>
      </ProSidebar>
      
      <div 
        className={"rack-container"}
        sx={{display: "flex",
          justifyContent: "space-around",
          width: "100%"}}
      >
        {wineracks && wineracks.map(winerack => (
          <div key={winerack.label} sx={{ m: 3 }}>
            <h2 sx={{textAlign: "center"}}>{winerack.label}</h2>
            {winerack.rows.map(row => (
              <Grid
                key={row}           
                sx={{p: 1}}
                columns={winerack.columns.length}
                gap={3}
                bg='wood'
              >
                {winerack.columns.map(column => (
                <Flex 
                  key={column} 
                  sx={{justifyContent: 'center', 
                    alignItems: 'center', 
                    width: 40, 
                    height: 40, 
                    borderRadius: 3}} 
                    bg='background'
                >
                  {winerack.bottles.map(bottle => (
                    fetchedBottles && bottle.yPosition == row && bottle.xPosition == column ? (
                      fetchedBottles.map(fetchedBottle => (
                        fetchedBottle.xPosition == column && fetchedBottle.yPosition == row ? (
                        <Box 
                          className="bottle"
                          key={bottle.name} 
                          sx={{width: 35, 
                            height: 35, 
                            borderRadius: '50%'}}
                            bg='text'
                        >
                          <Box 
                            className="hide"
                            bg="#fff"
                            color="#000"
                            sx={{zIndex: "100000", width: 150, position: "absolute",
                              margin: "-120px 0 0 20px", borderRadius: 5, 
                              border: "1px solid #520101"}}
                          >
                            <ul sx={{padding: "0 20px", marginTop: 10}}>
                              <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                {bottle.name}
                              </li>
                              <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                {bottle.year}
                              </li>
                              <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                {bottle.location}
                              </li>
                            </ul>
                          </Box>
                        </Box> 
                        ) : (
                        <Box 
                          className="bottle"
                          key={bottle.name} 
                          sx={{width: 35, 
                            height: 35, 
                            borderRadius: '50%'}}
                            bg='primary'
                        >
                          <Box 
                            className="hide"
                            bg="#fff"
                            color="#000"
                            sx={{zIndex: "100000", width: 150, position: "absolute",
                              margin: "-120px 0 0 20px", borderRadius: 5, 
                              border: "1px solid #520101"}}
                          >
                            <ul sx={{padding: "0 20px", marginTop: 10}}>
                              <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                {bottle.name}
                              </li>
                              <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                {bottle.year}
                              </li>
                              <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                {bottle.location}
                              </li>
                            </ul>
                          </Box>
                        </Box> 
                        )
                      ))
                    )
                    : 
                    ( !fetchedBottles && bottle.yPosition == row && bottle.xPosition == column ? (
                          <Box 
                            className="bottle"
                            key={bottle.name} 
                            sx={{width: 35, 
                              height: 35, 
                              borderRadius: '50%'}}
                              bg='primary'
                          >
                            <Box 
                              className="hide"
                              bg="#fff"
                              color="#000"
                              sx={{zIndex: "100000", width: 150, position: "absolute",
                                margin: "-120px 0 0 20px", borderRadius: 5, 
                                border: "1px solid #520101"}}
                            >
                              <ul sx={{padding: "0 20px", marginTop: 10}}>
                                <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                  {bottle.name}
                                </li>
                                <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                  {bottle.year}
                                </li>
                                <li sx={{borderBottom: "1px solid", padding: "5px", fontSize: "0.8rem"}}>
                                  {bottle.location}
                                </li>
                              </ul>
                            </Box>
                          </Box> 
                          ) : (
                            null
                        )
                      )
                    )
                  )}
                </Flex>
                ))}
              </Grid>
            ))}
          </div>
        ))}
      </div>
    </Flex>
  )
}


export default Cellar