const express=require('express');
const controller=require('./../Controllers/todoController');

const Router=express.Router();


Router.route('/')
      .get(controller.getTodos)
      .post(controller.createTodo)

Router.route('/:id')
      .get(controller.getTodo)
      .patch(controller.updateTodo)
      .delete(controller.deleteTodo)

module.exports=Router;