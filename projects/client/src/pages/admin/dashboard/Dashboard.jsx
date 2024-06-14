import { Fragment, useEffect, useState } from 'react';
import Axios from 'axios'

import { Box, Toolbar, IconButton, Badge,  Grid, Paper} from '@mui/material'
import { AssignmentOutlined, DashboardOutlined, DoorSlidingOutlined, Inventory2Outlined, Notifications,  PersonOutline } from '@mui/icons-material'

import LeftContainer from '../../../styles/tabs/LeftContainer';
import TopContainer from '../../../styles/tabs/TopContainer';
import Orders from '../../../components/admin/dashboard/Orders';
import DashboardContent from '../../../styles/container/DashboardContent';
import ItemTab from '../../../styles/tabs/ItemTab';

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  console.log(items, categories)

  const toggleDrawer = () => {
    setOpen(!open);
  };

function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const mainListItems = [
  {title:'Dashboard', icon: <DashboardOutlined/>},
  {title:'Orders', icon: <AssignmentOutlined/>},
  {title:'Racks', icon: <DoorSlidingOutlined/>},
  {title:'Items', icon: <Inventory2Outlined/>},
  {title:'Users', icon: <PersonOutline/>},
]

const mainList = (
  <Fragment>
    {mainListItems.map((item, index) => {
      return (
    <ItemTab key={index} title={item.title}>
      {item.icon}
    </ItemTab>
      )
    })}
  </Fragment>
);

const secondaryList = <Fragment></Fragment>;

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

const fetchItems = async () => { 
  try {
    const res = await Axios.get(`http://localhost:8000/api/admin/product/item`)
    setItems(res.data)
  } catch (err) {
    console.log(err) 
  }

  }
  
  const fetchCategories = async () => { 
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/product/`)
      setCategories(res.data)
    } catch (err) {
      console.log(err)
    }
}

useEffect(() => { 
  fetchItems()
  fetchCategories()
}, [])

  return (
    <Box sx={{ display: 'flex' }}>
       <TopContainer onToggle={toggleDrawer} open={open} title='Dashboard'>
       <IconButton color="inherit">
          <Badge badgeContent={null} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
       </TopContainer>

        <LeftContainer onToggle={toggleDrawer} open={open} mainList={mainList} secondaryList={secondaryList} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <DashboardContent>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height:240 }}>
                <Orders rows={rows} />
                </Paper>
              </Grid>
            
          </DashboardContent>
        </Box>
      </Box>
  )
}

export default Dashboard