const express=require('express');
const app=express();
const morgan=require('morgan');
const errorHandler=require('./controllers/errorController');

const studentRoutes=require('./routes/students');
const userRoutes=require('./routes/user');

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

// body parser
app.use(express.json());

// routes
app.use('/api/lms/v1/users',userRoutes);
app.use('/api/lms/v1/students',studentRoutes);

//handling errors in the global scope
app.use(errorHandler);
module.exports=app;