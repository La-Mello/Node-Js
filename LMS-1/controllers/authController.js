const jwt =require('jsonwebtoken');
const userModel =require('./../models/user');
const {promisify}=require('util');
const crypto=require('crypto');

/**
 * Function to create a json web token for the user
 @param {* user id} id
 @returns {jwt}
 */
const signToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_SECRET_EXP});
}

exports.protect=async (req,res,next)=>{
    try {
        // will be using a bearer token
        //check if authorization header is set
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1];

        }

        //check if token exists
        if(!token)return next("😥Please log in.😥");

        // verify token
        const payLoad= await promisify(jwt.verify)(token,process.env.JWT_SECRET);

        //console.log(payLoad);
        // check if user with that id exists
        const user=await userModel.findById(payLoad.id);

        if(!user)return next("User cannot be found..😑😶please log in again");

        req.user=user;
        next();

    } catch (err) {
        return next(err);
    }
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

        //sending the token as a cookie to the browser
        res.cookie('jwt',signToken(user._id),{httpOnly:true, maxAge: process.env.JWT_SECRET_EXP *1000});
        
        res.status(200).json({
            status:"logged in",
            token:signToken(user._id)
        });

    } catch (err) {
        return next(err);
    }

}


exports.forgotPassword=async (req,res,next)=>{

    //Todo:use email to reset password

    //!get email from the body

    const {email}= req.body;
    if(!email)return next("An email is required to reset the password");

    //!check if user with that email exists and is ! deleted
    const user= await userModel.findOne({email});

    if(!user) return next("An existing user with that email was not found");

    //!if user exists send an email to the user with a url to reset password
    user.pwdResetRequests ++;
    
    if(user.pwdResetRequests > 3){
        user.accountSuspended=true;
        await user.save({validateBeforeSave:false});
        return next("Exceeded password reset requests. Contact admin for password change");
    }

    //creating a random token
    const reseTToken= await crypto.randomBytes(20).toString('hex');
    
    //!url shuld contain a random token generated 

    const url=`A password reset request was made for your email. \n Use the following link to reset your password. \n
                http://localhost:3000/api/lms/v1/users/reset-password/${reseTToken} . Valid for only 10 minutes`

    //!the random tokken should also be stored in the database in encrypted form
    const hashedToken= await crypto.createHash('sha256').update(reseTToken).digest('hex');
    user.passwordResetToken=hashedToken;

    // creating a time lapse before the reset token becomes invalid (10 minutes)
    user.passwordResetExp=Date.now() + 10 * 60 * 1000
    // save the user details
    user.accountSuspended=false;
    await user.save({validateBeforeSave:false});

    //"an email was sent to you with a link,\n use it to reset your password"
    res.status(200).json({
        status:"success",
        message:url
    })
}

exports.resetPassword=async (req,res,next)=>{

    //!will use password and passwordConfirm to reset password
    const {password,passwordConfirm} = req.body
    if(!password || !passwordConfirm)return next("Pasword and confirmation are required");

    //!get the token from the url
    const {token}=req.params

    const hashedToken= await crypto.createHash('sha256').update(token).digest('hex');

    //!check if user with that token exist
    const user= await userModel.findOne({passwordResetToken:hashedToken}).select('+password');

    if(!user) return next("Invalid reset token. please request another one😢😢");

    //!update the password and passwordConfirm
    user.password=password;
    user.passwordConfirm=passwordConfirm;
    

    user.passwordChangedAt=Date.now()
    user.passwordResetToken=undefined
    user.passwordResetExp=undefined

    await user.save({validateBeforeSave:true})

    res.status(200).json({
        status:"success",
        message:"password changed successfully🎉🎉"
    })
}