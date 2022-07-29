const userModel=require('./../../models/user');

exports.getUser=async (req,res,next)=>{
    try {
        
        const data= await userModel.find();

        res.status(200).json({
            status:"success",
            number:data.length,
            data
        });

    } catch (err) {
        
        return next(err);
    }
}

exports.getUserById=async (req,res,next)=>{
}

exports.createUser=async (req,res,next)=>{

    try {
        
        const user= await userModel.create(req.body);

        res.status(200).json({
            status:"success",
            user
        });

    } catch (err) {

        return next(err);

    }
}

exports.updateUser=async (req,res,next)=>{
}

exports.deleteUser=async (req,res,next)=>{
}