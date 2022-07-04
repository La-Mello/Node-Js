const express=require('express');
const controller=require('./../Controllers/userController');

const Router=express.Router();


Router.route('/')
      .get(controller.getUsers)
      .post(controller.createUser)

Router.route('/:id')
      .get(controller.getUser)
      .patch(controller.updateUser)
      .delete(controller.deleteUser)

module.exports=Router;