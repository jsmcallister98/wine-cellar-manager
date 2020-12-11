/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { Box, Grid, Flex } from 'theme-ui'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar'
import useSWR from 'swr'


const Cellar = () => {

  const [active, setActive] = React.useState(false)

  const fetcher = url => fetch(url).then(res => res.json())

  function useBottle () {
    const { data, error } = useSWR(`/api/bottles/`, fetcher)
    console.log(data)

    return { 
      bottles: data,
      isLoading: !error && !data,
      isError: error
    }
  }

  const { bottles, isLoading } = useBottle()
  if (isLoading) return <div>Loading...</div>

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
            <form>
              <input type="text" placeholder="Bottle Name" />
              <input type="text" placeholder="Wine Type" />
              <input type="text" placeholder="Year" />
              <input type="text" placeholder="Location" />
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
          sx={{background: "#563617", p: 1}}
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
          sx={{background: "#563617", p: 1}}
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
          sx={{background: "#563617", p: 1}}
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
          sx={{background: "#563617", p: 1}}
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
          sx={{background: "#563617", p: 1}}
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
          sx={{background: "#563617", p: 1}}
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