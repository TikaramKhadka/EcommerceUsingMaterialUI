'use client'
import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Collapse, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FileCopyIcon from '@mui/icons-material/FileCopy'; // Import FileCopyIcon
import Link from 'next/link'; // Import Link from Next.js
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

const Sidebar = () => {
  const [openReports, setOpenReports] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleReportsClick = () => {
    setOpenReports(!openReports);
  };

  const handleCollapseClick = () => {
    setCollapsed();
  };

  return (
    <div
      className={`fixed bg-white text-black h-screen border shadow-md transition-all duration-300 ${collapsed ? 'w-16' : 'w-1/6'}`}
      style={{ top: '60px' }} // Adjust the top position to start below the navbar
    >
      <div className="p-4 font-bold text-xl border-b border-gray-200 flex items-center">
        {/* Dashboard Item with Collapse Icon */}
        <ListItem className="hover:bg-gray-10 text-center">        
          <Link href="/dashboard" dashHref>
          <ListItemText primary="Dashboard" />
          </Link> 
        </ListItem>
      </div>
      <List>
      <ListItem button className="hover:bg-gray-100">
          <ListItemIcon>
            <ApartmentRoundedIcon  />
          </ListItemIcon>
          <Link href="/brand" passHref>
            <ListItemText primary="Brand" />
          </Link>
        </ListItem>
        <ListItem button className="hover:bg-gray-100">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <Link href="/category" passHref>
            <ListItemText primary="Category" />
          </Link>
        </ListItem>

        <ListItem button className="hover:bg-gray-100">
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <Link href="/product" passHref>
            <ListItemText primary="Product" />
          </Link>
        </ListItem>

        <ListItem button className="hover:bg-gray-100">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Link href="/user" userHref>
            <ListItemText primary="Users" />
          </Link>
        </ListItem>

        <ListItem button className="hover:bg-gray-100">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Link href="/settings" passHref>
            <ListItemText primary="Settings" />
          </Link>
        </ListItem>

        {/* Reports with Sub-menu */}
        <ListItem button onClick={handleReportsClick} className="hover:bg-gray-100">
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Reports" />}
          {!collapsed && (openReports ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>

        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="pl-10 hover:bg-gray-100">
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <Link href="/reports/sales" passHref>
                <ListItemText primary="Sales Report" />
              </Link>
            </ListItem>
            <ListItem button className="pl-10 hover:bg-gray-100">
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <Link href="/reports/orders" passHref>
                <ListItemText primary="Order Report" />
              </Link>
            </ListItem>
            <ListItem button className="pl-10 hover:bg-gray-100">
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <Link href="/reports/cancel" passHref>
                <ListItemText primary="Cancel Report" />
              </Link>
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Divider />
    </div>
  )
};

export default Sidebar;
