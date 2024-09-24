const Router = require('express');
const { getUserCount, getProductCount, getCategoryCount, getBrandCount}=require('../controllers/dashboard')
    const DashboardRoute = Router();
  
    // get product count
    DashboardRoute.get('/productcount', getProductCount);
    // get user count
    DashboardRoute.get('/usercount', getUserCount);
    // get category count
    DashboardRoute.get('/categorycount', getCategoryCount);
    // get brand
    DashboardRoute.post('/brandcount',getBrandCount);
    // //get order count
    // DashboardRoute.put('/ordercount', getOrderCount) 

    module.exports = DashboardRoute;