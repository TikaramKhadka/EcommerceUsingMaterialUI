const express = require('express');
const app = express();

const UserRoute = require('./route/user');
const CategoryRoute = require('./route/category');
const ProductRoute = require('./route/product');
const BrandRoute = require('./route/brand');
const DashboardRoute = require('./route/dashboard');
const cors =require('cors')
const connectDB = require('./database/connection')
// db connection

connectDB()
//to declare custom port no
const port = process.env.BACKEEND_PORT;

 // To parse incoming JSON data
app.use(express.json());
app.use(cors());
app.use('/api', UserRoute); 
app.use('/api', CategoryRoute);
app.use('/api', ProductRoute);
app.use('/api', BrandRoute);
app.use('/api', DashboardRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
