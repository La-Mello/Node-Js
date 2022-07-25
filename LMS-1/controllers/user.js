const userModel=require('./../models/user');

exports.createUser=async (req,res,next)=>{
    
    try {

        const newUser= await userModel.create(req.body);

        res.status(200).json({

            status:"success",

            data:{
                newUser
            }
        })
        
    } catch (err) {
        return next(err);
    }
    
}

exports.getUserById=async (req,res,next)=>{
  
    try {
        // if(!isValidObjectId(req.params.id))
        //     return next("Invalid Object Id");

        const  user= await userModel.findById(req.params.id);

        res.status(200).json({
            status:"success",
            data:{
                user
            }
        })
    } catch (err) {
        return next(err);
    }
}

exports.getUser=async (req,res,next)=>{
  
    try {
        
        const  users= await userModel.find().select('email name role');

        res.status(200).json({
            status:"success",
            data:{
                users
            }
        })
    } catch (err) {
        return next(err);
    }
}

exports.updateUser=async (req,res,next)=>{
  
    res.status(200).json({
        status:"working"
    })
}

exports.deleteUser=async (req,res,next)=>{
  
    res.status(200).json({
        status:"working"
    })
}