'use client';
import React from 'react';
import { Box } from '@mui/material';
import ChartView from './chart/page';
import SummaryData from './summarydata/page';

const Dashboard = () => {
  return (  
    <div className='m-auto'>  
    <Box>
      <Box> {/* Reduced margin to avoid large gap */}
        <SummaryData/>
      </Box>
      <Box> {/* Reduced margin to avoid large gap */}
        <ChartView />
      </Box>
    </Box>
    </div>
  );
};

export default Dashboard;
