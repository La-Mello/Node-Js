const express=require('express');
const controller=require('./../Controllers/userController');
const authController=require('./../Controllers/authController');

const Router=express.Router();

Router.post('/sign-up',authController.signup);
Router.post('/login',authController.login);
Router.post('/forgot-password',authController.forgotPassword);
Router.patch('/forgot-password/:token',authController.resetPassword);


Router.route('/')
      .get(authController.protect,controller.getUsers)
      .post(authController.protect,authController.restrictTo('admin'),controller.createUser)

Router.route('/:id')
      .get(authController.protect,controller.getUser)
      .patch(authController.protect,controller.updateUser)
      .delete(authController.protect,authController.restrictTo('admin'),controller.deleteUser)

module.exports=Router;