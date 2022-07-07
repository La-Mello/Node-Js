const express=require('express');
const controller=require('./../Controllers/userController')
const authController=require('./../Controllers/authController');

const router=express.Router();

// auth conrollers
router.post('/signup',authController.signup);
router.post('/login',authController.login);

// change password functionality
router.patch('/change-password',authController.protect,authController.updatePassword);

// updating the user data
router.patch('/update',authController.protect,controller.updateMe);


router.post('/forgot-password',authController.forgotPassword);
router.patch('/reset-password/:token',authController.resetPassword);



router.route('/')
    .get(authController.protect,authController.restrictTo('admin'),controller.getUser)
    .post(controller.createUser);

//all routes with the id set
router.route('/:id')
      .get(controller.getUserById)
      .delete(controller.deleteUser)
      .patch(controller.updateUser);
    
module.exports=router