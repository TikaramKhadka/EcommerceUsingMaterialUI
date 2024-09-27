'use client'
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';

const SummaryData = () => {
    // Sample data for card contents
  const data = [
    {
      title: 'Sales',
      count: '12 K',
      icon: <AttachMoneyIcon />,
      color: '#4caf50',
    },
    {
      title: 'Orders',
      count: '850',
      icon: <ShoppingCartIcon/>,
      color: '#2196f3',
    },
    {
      title: 'Brand',
      count: '12',
      icon: <ApartmentRoundedIcon/>,
      color: '#f44336',
    },
    {
      title: 'Products',
      count: '540',
      icon: <InventoryIcon />,
      color: '#ff9800',
    },
    {
      title: 'Categories',
      count: '12',
      icon: <CategoryIcon />,
      color: '#f44336',
    },
    {
      title: 'Users',
      count: '12',
      icon: <PeopleIcon/>,
      color: '#f44336',
    }
  ];
  return (   
    <Grid container spacing={4}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} xl={2} key={index} >
          <Card sx={{ display: 'flex', alignItems: 'center', padding: 1, boxShadow: 3 }}>
            <Avatar sx={{ backgroundColor: item.color, marginRight: 1, marginLeft:1 }}>
              {item.icon}
            </Avatar>
            <CardContent>
              <Typography className='font-bold' component="div">
                {item.title}
              </Typography>
              <Typography className='font-semibold' color="text.primary">
                {item.count}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default SummaryData
