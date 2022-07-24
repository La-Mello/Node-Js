const express=require('express');
const controller=require('./../controllers/user');
const auth=require('./../controllers/authController');
const Router=express.Router();
const protectRoute=require('./../utils/protect');

Router.post('/sign-up',auth.signUp);

Router.post('/login',auth.login);
Router.post('/forgot-password',auth.forgotPassword);
Router.post('/reset-password/:token',auth.resetPassword);

Router.route('/')
      .get(protectRoute('user'),controller.getUser)
      .post(controller.createUser)

Router.route('/:id')
      .delete(controller.deleteUser)
      .get(protectRoute('user'),controller.getUserById)
      .patch(protectRoute('user'),controller.updateUser)

module.exports=Router;