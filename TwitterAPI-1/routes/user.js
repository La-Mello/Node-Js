const express=require('express');
const userController=require('./../controllers/users/controller');
const authController=require('./../controllers/auth/controller');


const Router =express.Router();

Router.post('/sign-up',authController.signUp);
Router.post('/login',authController.login);


// ? user not logged in
Router.post('/forgot-password',authController.forgotPassword);
Router.post('/reset-password/:token',authController.resetPassword);

//? user Logged in
Router.post('/two-factor-authenticate',authController.protect,authController.TWOFACTORAUTH);
Router.patch('/change-password',authController.protect,authController.changePassword);
Router.delete('/delete-account',authController.protect,authController.deleteAccount);

Router.route('/')
      .get(authController.protect,userController.getUser)
      .post(authController.protect,userController.createUser)

Router.route('/:id')
      .get(authController.protect,userController.getUserById)
      .delete(authController.protect,userController.deleteUser)
      .patch(authController.protect,userController.updateUser)


module.exports = Router;