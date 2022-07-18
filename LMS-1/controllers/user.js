const userModel=require('./../models/user');

exports.getUser=async (req,res,next)=>{
    
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
  
    res.status(200).json({
        status:"working"
    })
}

exports.createUser=async (req,res,next)=>{
  
    res.status(200).json({
        status:"working"
    })
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