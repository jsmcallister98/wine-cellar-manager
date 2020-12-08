/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { Box, Grid, Flex } from 'theme-ui'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const Cellar = () => {

  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <Flex id="CellarPage">
      <ProSidebar collapsed={collapsed}>
      <FaIcons.FaUserEdit sx={{fontSize: "1.5rem", m: 2, cursor: "pointer"}}/>
      <Menu iconShape="square">
          <MenuItem>
            Search
            <form >
              <input type="text" sx={{width: "100%", height: 30}} />
            </form>
          </MenuItem>
          <SubMenu title="Add a Rack">

          </SubMenu>
          <SubMenu title="Add a Bottle">

          </SubMenu>
          <SubMenu title="My Racks">

          </SubMenu>
          <SubMenu title="My Bottles">

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
          sx={{background: "#4f3a3a", p: 2}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#4f3a3a", p: 2}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#4f3a3a", p: 2}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#4f3a3a", p: 2}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#4f3a3a", p: 2}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
        </Grid>
        <Grid 
          sx={{background: "#4f3a3a", p: 2}}
          columns={6}
          gap={3}>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='muted'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg='#943132'></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
            <Box sx={{width: 35, height: 35, borderRadius: '50%'}}
                 bg=''></Box>
          </Flex>
          <Flex sx={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}} bg='#000'>
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