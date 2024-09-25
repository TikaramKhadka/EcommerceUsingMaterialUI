'use client';
import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import ChartView from './chart/page';
import SummaryData from './summarydata/page';

const Dashboard = () => {
  return (  
    <Box>
      <Box> {/* Reduced margin to avoid large gap */}
        <SummaryData/>
      </Box>
      <Box> {/* Reduced margin to avoid large gap */}
        <ChartView />
      </Box>
    </Box>
  );
};

export default Dashboard;
