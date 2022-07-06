const express=require('express');
const controller=require('./../Controllers/userController');
const authController=require('./../Controllers/authController');

const Router=express.Router();

Router.post('/sign-up',authController.signup);
Router.post('/login',authController.login);


Router.route('/')
      .get(authController.protect,controller.getUsers)
      .post(controller.createUser)

Router.route('/:id')
      .get(authController.protect,controller.getUser)
      .patch(authController.protect,controller.updateUser)
      .delete(authController.protect,authController.restrictTo('admin'),controller.deleteUser)

module.exports=Router;