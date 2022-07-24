const studentModel=require('./../models/student');
const userModel=require('./../models/user');
const {promisify}=require('util');
const jwt=require('jsonwebtoken');

const protect=(userType)=>{

    if(userType === 'user'){
        return (
                async (req,res,next)=>{
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
                    const student=await userModel.findById(payLoad.id);
            
                    if(!student)return next("user cannot be found..😑😶please log in again");
            
                    req.student=student;
                    next();
            
                } catch (err) {
                    return next(err);
                }
            }
        );
    }
    else if(userType === 'student'){

        return (
            async (req,res,next)=>{
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
                const student=await studentModel.findById(payLoad.id);
        
                if(!student)return next("student cannot be found..😑😶please log in again");
        
                req.student=student;
                next();
        
            } catch (err) {
                return next(err);
            }
        }
    );

    }
}

module.exports=protect