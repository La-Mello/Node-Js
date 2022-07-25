const express=require('express');
const controller=require('./../controllers/user');
const auth=require('./../controllers/authController');
const protectRoute=require('./../utils/protect');
const logout=require('./../utils/logout');

const Router=express.Router();

Router.post('/sign-up',auth.signUp);

Router.post('/login',auth.login);
Router.get('/logout',protectRoute('user'),logout('user'));
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