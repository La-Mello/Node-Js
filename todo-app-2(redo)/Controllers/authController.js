const userModel=require('./../models/user');
const jwt=require('jsonwebtoken');
const catchAsync=require('./../utils/catchAsync');
const appError=require('./../utils/appError');
const bcrypt=require('bcryptjs');
const {promisify}=require('util');

// will encode the user id into the jwt payload
const signToken= function (id) {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES});
}
/**function to verify the user password against the input password */
function verifyPassword(password,userPassword) {
    return bcrypt.compare(password,userPassword);
}
// Sign up activity
exports.signup=catchAsync(async (req,res,next)=>{
        const user= await userModel.create(req.body);
        res.status(200).json({
            status:"user created successfully",
            token:signToken(user._id),
            data:{
                user
            }
        });
})


exports.login=catchAsync( async (req,res,next)=>{
    //will login using email and password
    const {email,password} = req.body
    // 1. check if email and password is set
    if(!email || !password) return next(new appError('all fields are required',401));

    // locate the user in DB using the email and verify password
    const user=await userModel.findOne({email}).select('+password');
    
    if(!user || ! await verifyPassword(password,user.password)) return next(new appError('Invalid email or password',401));

    // at this point the user details are ok
    res.status(200).json({
        status:"login successfully",
        token:signToken(user._id)
    });

});


// protecting the routes to logged in users
exports.protect=catchAsync( async (req,res,next)=>{
    // check if the authorization(Bearer) field is set
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        // get the authorization token from the headers
        token=req.headers.authorization.split(' ')[1];
    }

    if(!token)return next(new appError('Log in please 🙄',401));

    // token verification
    const payLoad= await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    
    
    // get the user with the id from the token
    const user=await userModel.findById(payLoad.id);
    if(!user)return next(new appError('User doesn\'t exist..😫',401));

    req.user=user;
    next();
})