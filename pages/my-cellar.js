/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { Box, Grid, Flex, Button } from 'theme-ui'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar'
import useSWR from 'swr'


const Cellar = () => {
  // opening/closing of sidebar
  const [active, setActive] = React.useState(false);

  // fetching data from server
  const fetcher = url => fetch(url).then(res => res.json());

  const useBottle = () => {
    const { data, error } = useSWR(`/api/bottles/`, fetcher)
    console.log(data)

    return { 
      bottles: data,
      isLoading: !error && !data,
      isError: error
    }
  };

  const { bottles, isLoading } = useBottle();
  if (isLoading) return <div>Loading...</div>

  // post data to server 
  const [newBottle, setNewBottle] = React.useState({name: '', type: '', year: '', location: ''});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/bottles', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        newBottle: newBottle
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  };

  return (
    <Flex id="CellarPage">
      <ProSidebar collapsed={active}>
        <SidebarHeader>
          <FaIcons.FaAngleDoubleLeft onClick={() => setActive(true)} 
          className={active ? "close-icon active-side" : "close-icon"}/>
          <FaIcons.FaAngleDoubleRight onClick={() => setActive(false)}
          className={active ? "open-icon" : "open icon active-side"}/>
        </SidebarHeader>      
        <Menu iconShape="square">
          <MenuItem icon={<FaIcons.FaSearch />}>
            <form >
              <input type="text" placeholder="Search" sx={{width: "100%", height: 30}} />
            </form>
          </MenuItem>
          <SubMenu title="Add a Rack" icon={<FaIcons.FaBorderAll className="bottle-icon" />}>

          </SubMenu>
          <SubMenu title="Add a Bottle" icon={<FaIcons.FaWineBottle className="bottle-icon" />}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input onChange={(e) => handleNameChange(e)} type="text" placeholder="Bottle Name" />
              <input onChange={(e) => handleTypeChange(e)} type="text" placeholder="Wine Type" />
              <input onChange={(e) => handleYearChange(e)} type="text" placeholder="Year" />
              <input onChange={(e) => handleLocationChange(e)} type="text" placeholder="Location" />
              <input type="submit" />
            </form>
          </SubMenu>
          <SubMenu title="My Racks" icon={<FaIcons.FaBorderAll className="bottle-icon" />}>

          </SubMenu>
          <SubMenu title="My Bottles" icon={<FaIcons.FaWineBottle className="bottle-icon" />}>
            {bottles.data.map(bottle => (
              <MenuItem>{bottle.name}</MenuItem>)
              )}
          </SubMenu>
        </Menu>
      </ProSidebar>
      
    <div 
      sx={{display: "flex",
           justifyContent: "center",
           width: "100%"}}
      className="rack-container">
      <div>
        <Grid 
          sx={{background: "#422912", p: 1}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#422912", p: 1}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#422912", p: 1}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#422912", p: 1}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#422912", p: 1}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#422912", p: 1}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 3}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
        </Grid>
      </div>
    </div>
    </Flex>
  )
}

export default Cellar