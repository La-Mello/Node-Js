const studentModel=require('./../models/student');
const jwt=require('jsonwebtoken');

/**
 * Function to create a json web token for the user
 @param {* user id} id
 @returns {jwt}
 */
 const signToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_SECRET_EXP});
}

exports.register=async (req,res,next)=>{
    try {

        const newstudent=await studentModel.create(req.body);

        res.status(200).json({
            status:"success",
            student:{
                newstudent
            }
        })
    } catch (err) {
        return next(err);
    }
}

exports.login=async (req,res,next)=>{

    try {
        // student can either use his/her email adress to log in with his/her password
        const {email,password} = req.body;
        
        if(!email || !password)
            return next("Provide all details required");
        
        const student=await studentModel.findOne({schoolEmailAdress:email}).select('+password');

        if(!student || ! await student.verifyPassword(password,student.password))
            return next("Invalid email or password");

        res.status(200).json({
            status:"login success",
            token:signToken(student._id)
        });

    } catch (err) {
        return next(err);
    }
}