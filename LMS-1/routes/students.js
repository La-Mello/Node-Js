const express=require('express');
const studentController=require('./../controllers/student')
const Router=express.Router();

Router.post('/register',studentController.register);
Router.post('/login',studentController.login);

module.exports=Router;