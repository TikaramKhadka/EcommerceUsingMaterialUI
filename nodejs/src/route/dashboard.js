const Router = require('express');
const { getUserCount, getProductCount, getCategoryCount, getBrandCount}=require('../controllers/dashboard')
    const DashboardRoute = Router();
  
    // get product count
    DashboardRoute.get('/productcounts', getProductCount);
    // get user count
    DashboardRoute.get('/usercounts', getUserCount);
    // get category count
    DashboardRoute.get('/categorycounts', getCategoryCount);
    // get brand
    DashboardRoute.post('/brandcounts',getBrandCount);
    // //get order count
    // DashboardRoute.put('/ordercount', getOrderCount) 

    module.exports = DashboardRoute;