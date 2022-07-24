const express=require('express');
const studentController=require('./../controllers/student')
const Router=express.Router();
const libraryController=require('./../controllers/library');
const protectRoute=require('./../utils/protect');


//! account routes

Router.post('/register',studentController.register);
Router.post('/login',studentController.login);
Router.post('/forgot-password',studentController.forgotPassword)
Router.post('/reset-password',studentController.resetPassword)


//! library routes
Router.route('/library')
      .get(protectRoute('student'),libraryController.getBooks)

module.exports=Router;