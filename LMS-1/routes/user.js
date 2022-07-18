const express=require('express');
const controller=require('./../controllers/user');
const auth=require('./../controllers/authController');
const Router=express.Router();

Router.post('/sign-up',auth.signUp);

Router.post('/login',auth.login);

Router.route('/')
      .get(controller.getUser)
      .post(controller.createUser)

Router.route('/:id')
      .delete(controller.deleteUser)
      .get(controller.getUserById)
      .patch(controller.updateUser)

module.exports=Router;