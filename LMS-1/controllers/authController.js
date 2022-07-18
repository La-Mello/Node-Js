const jwt =require('jsonwebtoken');
const userModel =require('./../models/user');

/**
 * Function to create a json web token for the user
 @param {* user id} id
 @returns {jwt}
 */
const signToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_SECRET_EXP});
}

/**
 * 
 * @param {*request from browser} req 
 * @param {*response to browser} res 
 * @param {*calls the next middleware function } next 
 * @returns {success or failed}
 */
exports.signUp=async (req,res,next)=>{

    try{

        const newUser=await userModel.create(req.body);

        res.status(200).json({
            status:"success",
            data:{
                newUser
            }
        })

    }catch(err){
        return next(err);
    }
}

exports.login=async (req,res,next)=>{

    try {

        //will use email and password to login
        const {email,password}=req.body

        const user = await userModel.findOne({email}).select('+password');

        if(!user || ! await user.checkPassword(password,user.password)){
            const err=new Error("Invalid email or password");
            return next(err);
        }
        
        res.status(200).json({
            status:"logged in",
            token:signToken(user._id)
        });

    } catch (err) {
        return next(err);
    }

}
