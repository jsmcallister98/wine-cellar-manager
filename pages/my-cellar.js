/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { Box, Grid, Flex } from 'theme-ui'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar'
import useSWR from 'swr'

const Cellar = () => {
  // opening/closing of sidebar
  const [active, setActive] = React.useState(false);

  // hover over bottles to display info
  const [hovering, setHovering] = React.useState(false)

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

  const useWineRack = () => {
    const { data, error } = useSWR(`/api/wineracks/`, fetcher)
    console.log(data)

    return { 
      wineracks: data,
      isLoadingRacks: !error && !data,
      isError: error
    }
  };

  const { wineracks, isLoadingRacks } = useWineRack();

  const { bottles, isLoading } = useBottle();

  // post new rack to server
  const [newRack, setNewRack] = React.useState({
    label: '',
    rows: 0,
    columns: 0
  });

  const handleLabelChange = (e) => {
    const newParam = {label: e.target.value};
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
      body: JSON.stringify(newRack)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
    window.location.reload();
  };

  // post new bottle to server 
  const [newBottle, setNewBottle] = React.useState({
    name: '', 
    type: '', 
    year: '', 
    location: '',
    rack: '',
    xPosition: 0,
    yPosition: 0
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
      body: JSON.stringify({
        newBottle: newBottle
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
    window.location.reload();
  };

  if (isLoading || isLoadingRacks) return <div>Loading...</div>

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
            <form onSubmit={(e) => handleRackSubmit(e)}>
              <input onChange={(e) => handleLabelChange(e)} type="text" placeholder="Winerack label" />
              <input onChange={(e) => handleRowsChange(e)} type="text" placeholder="Rows" />
              <input onChange={(e) => handleColumnsChange(e)} type="text" placeholder="Columns" />
              <button type="submit">
                Submit
              </button>
            </form>
          </SubMenu>
          <SubMenu title="Add a Bottle" icon={<FaIcons.FaWineBottle className="bottle-icon" />}>
            <form onSubmit={(e) => handleBottleSubmit(e)}>
              <input onChange={(e) => handleNameChange(e)} type="text" placeholder="Bottle Name" />
              <input onChange={(e) => handleTypeChange(e)} type="text" placeholder="Wine Type" />
              <input onChange={(e) => handleYearChange(e)} type="text" placeholder="Year" />
              <input onChange={(e) => handleLocationChange(e)} type="text" placeholder="Location" />
              <input onChange={(e) => handleRackChange(e)} type="text" placeholder="Winerack label" />
              <input onChange={(e) => handleYPositionChange(e)} type="text" placeholder="Row" />
              <input onChange={(e) => handleXPositionChange(e)} type="text" placeholder="Column" />
              <button type="submit">
                Submit
              </button>
            </form>
          </SubMenu>
          <SubMenu title="My Racks" icon={<FaIcons.FaBorderAll className="bottle-icon" />}>

          </SubMenu>
          <SubMenu title="My Bottles" icon={<FaIcons.FaWineBottle className="bottle-icon" />}>
            {bottles.data.map(bottle => (
              <MenuItem key={bottle.name + '_'}>{bottle.name}</MenuItem>))
            }
          </SubMenu>
        </Menu>
      </ProSidebar>
      
      <div 
        sx={{display: "flex",
          justifyContent: "center",
          width: "100%"}}
        className={"rack-container"}>
        {wineracks.data.map(winerack => (
          <div key={winerack.label} sx={{ m: 3 }}>
            {winerack.rows.map(row => (
              <Grid
                key={row}           
                sx={{background: "#422912", p: 1}}
                columns={winerack.columns.length}
                gap={3}
              >
                {winerack.columns.map(column => (
                <Flex 
                  key={column} 
                  sx={{justifyContent: 'center', 
                    alignItems: 'center', 
                    width: 40, 
                    height: 40, 
                    borderRadius: 3}} 
                    bg='#000'
                >
                  {winerack.bottles.map(bottle => (
                    bottle.yPosition == row && bottle.xPosition == column ? (
                    <Box key={bottle.name} 
                      sx={{width: 35, 
                        height: 35, 
                        borderRadius: '50%'}}
                        bg='muted'
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