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
  const [colorMode, setColorMode] = useColorMode();
  // opening/closing of sidebar
  const [active, setActive] = useState(false);
  
  // hover over bottles to display info
  const [hovering, setHovering] = useState(false);
  
  // // fetching data from server
  // const fetcher = url => fetch(url).then(res => res.json());
  
  // const useBottle = () => {
    //   const { data, error } = useSWR(`/api/bottles/`, fetcher)
    //   console.log(data)
    
    //   return { 
      //     bottles: data,
      //     isLoading: !error && !data,
      //     isError: error
      //   }
      // };
      
      // const useWineRack = () => {
        //   const { data, error } = useSWR(`/api/wineracks/`, fetcher)
        //   console.log(data)
        
        //   return { 
          //     wineracks: data,
          //     isLoadingRacks: !error && !data,
          //     isError: error
          //   }
          // };
          
          // const { wineracks, isLoadingRacks } = useWineRack();
          
          // const { bottles, isLoading } = useBottle();
          
  const [user, { mutate }] = useUser();
  const { name, email, wineracks, bottles, cellars } = user || {};
  const [isUpdating, setIsUpdating] = useState(false);
  const labelRef = useRef();
  const rowsRef = useRef();
  const columnsRef = useRef();
  const [msg, setMsg] = useState({ message: '', isError: false });

  // useEffect(() => {
  //   nameRef.current.value = user.name;
  //   bottlesRef.current.value = user.bottles;
  //   wineracksRef.current.value = user.wineracks;
  // }, [user]);

  const handleWinerackSubmit = async (e) => {
    e.preventDefault();
    console.log("posting rack...")
    if (isUpdating) return;
    setIsUpdating(true);
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
  
  // post new rack to server
  const [newRack, setNewRack] = useState({
    label: '',
    rows: 0,
    columns: 0,
    bottles: [],
    isWinerack: true
  });
  
  const handleLabelChange = (e) => {
    const newParam = {label: e.target.value};
    setNewRack({...newRack, ...newParam});
  };

  const handleUserChange = (e) => {
    const newParam = {user: user.email};
    setNewRack({...newRack, ...newParam});
  };
  
  const handleRowsChange = (e) => {
    const newParam = {rows: e.target.value};
    setNewRack({...newRack, ...newParam});
  };
  
  const handleColumnsChange = (e) => {
    const newParam = {columns: e.target.value};
    setNewRack({...newRack, ...newParam});
  };
  
  const handleRackSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/wineracks', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newRack),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
    window.location.reload();
  };

  const handleRackSubmits = (e) => {
    handleRackSubmit(e)
    handleWinerackSubmit(e)
  }

  // post new bottle to server 
  const [newBottle, setNewBottle] = useState({
    name: '', 
    type: '', 
    year: '', 
    location: '',
    rack: '',
    xPosition: 0,
    yPosition: 0,
    isBottle: true
  });

  const handleNameChange = (e) => {
    const newParam = {name: e.target.value};
    setNewBottle({...newBottle, ...newParam});
  };

  const handleTypeChange = (e) => {
    const newParam = {type: e.target.value};
    setNewBottle({...newBottle, ...newParam});
  };

  const handleYearChange = (e) => {
    const newParam = {year: e.target.value};
    setNewBottle({...newBottle, ...newParam});
  };

  const handleLocationChange = (e) => {
    const newParam = {location: e.target.value};
    setNewBottle({...newBottle, ...newParam});
  };

  const handleRackChange = (e) => {
    const newParam = {rack: e.target.value};
    setNewBottle({...newBottle, ...newParam});
  };

  const handleXPositionChange = (e) => {
    const newParam = {xPosition: parseInt(e.target.value)};
    setNewBottle({...newBottle, ...newParam});
    console.log(newBottle)
  };

  const handleYPositionChange = (e) => {
    const newParam = {yPosition: parseInt(e.target.value)};
    setNewBottle({...newBottle, ...newParam});
  };

  const handleBottleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/bottles', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newBottle)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
    window.location.reload();
  };

  const handleNewBottleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const res = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newBottle),
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

  const handleBothSubmit = (e) => {
    handleNewBottleSubmit(e)
    handleBottleSubmit(e)
  }

  // if (isLoading || isLoadingRacks) return <div>Loading...</div>

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
            <form >
              <input type="text" placeholder="Search" sx={{width: "100%", p: 2, borderRadius: 3, border: '1px solid', color: 'text'}} />
            </form>
          </MenuItem>
          <SubMenu title="Add a Rack" icon={<FaIcons.FaBorderAll className="bottle-icon" />}>
          {msg.message ? <p style={{ color: msg.isError ? 'red' : '#0070f3', textAlign: 'center' }}>{msg.message}</p> : null}
            <form onSubmit={handleRackSubmits}>
              <label htmlFor="label">
                <input 
                  onChange={(e) => handleLabelChange(e)}
                  type="text" 
                  id="label"
                  name="label"
                  placeholder="Winerack label"
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'text'}}
                />
              </label>
              <label htmlFor="rows">
                <input 
                  onChange={(e) => handleRowsChange(e)} 
                  type="text" 
                  id="rows"
                  name="rows"
                  placeholder="Rows" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'text'}} 
                />
              </label>
              <label htmlFor="columns">
                <input 
                  onChange={(e) => handleColumnsChange(e)} 
                  type="text" 
                  id="columns"
                  name="columns"
                  placeholder="Columns" 
                  sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'text'}} 
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
            <form onSubmit={handleBothSubmit}>
              <input onChange={(e) => handleNameChange(e)} type="text" placeholder="Bottle Name" 
                sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'primary'}} />
              <input onChange={(e) => handleTypeChange(e)} type="text" placeholder="Wine Type" 
                sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'primary'}} />
              <input onChange={(e) => handleYearChange(e)} type="text" placeholder="Year" 
                sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'primary'}} />
              <input onChange={(e) => handleLocationChange(e)} type="text" placeholder="Location" 
                sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'primary'}} />
              <input onChange={(e) => handleRackChange(e)} type="text" placeholder="Winerack label" 
                sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'primary'}} />
              <input onChange={(e) => handleYPositionChange(e)} type="text" placeholder="Row" 
                sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'primary'}} />
              <input onChange={(e) => handleXPositionChange(e)} type="text" placeholder="Column" 
                sx={{p: 2, borderRadius: 3, mb: 2, border: '1px solid', color: 'primary'}} />
              <Button sx={{cursor: 'pointer', width: 174}} bg='background' color='text' type="submit">
                Submit
              </Button>
            </form>
          </SubMenu>
          <SubMenu title="My Racks" icon={<FaIcons.FaBorderAll className="bottle-icon" />}>
            {wineracks && wineracks.map(winerack => (
              <MenuItem key={winerack.label + '_'}>{winerack.label}</MenuItem> 
            ))}
          </SubMenu>
          <SubMenu title="My Bottles" icon={<FaIcons.FaWineBottle className="bottle-icon" />}>
            {bottles && bottles.map(bottle => (
              <MenuItem key={bottle.name + '_'}>{bottle.name}</MenuItem>
              ))}
          </SubMenu>
        </Menu>
      </ProSidebar>
      
      <div 
        sx={{display: "flex",
          justifyContent: "center",
          width: "100%"}}
        className={"rack-container"}>
        {wineracks && wineracks.map(winerack => (
          <div key={winerack.label} sx={{ m: 3 }}>
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
                    bottle.yPosition == row && bottle.xPosition == column ? (
                    <Box key={bottle.name} 
                      sx={{width: 35, 
                        height: 35, 
                        borderRadius: '50%'}}
                        bg='primary'
                    >
                    </Box> 
                    )
                      : (
                        null
                    )
                  ))}
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