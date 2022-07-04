const { isValidObjectId } = require('mongoose');
const userModel=require('./../models/user');

// CREATE
exports.createUser=async (req,res)=>{
    try{

        const user= await userModel.create(req.body);
        
        res.status(200).json({
            status:"user created successfully",
            data:{
                user
            }
        });
    }catch(err){
        console.log(err.stack);
        res.status(401).json({
            status:"Something went wrong",
            error:err
        });
    }
}
// READ
exports.getUsers=async (req,res)=>{

    try{
        const result= await userModel.find({},{username:1,reqisteredAt:1,email:1});

        res.status(200).json({
            status:"success",
            number:result.length,
            data:{
                result
            }
        });
        
    }catch(err){

        console.log(err.stack);
        res.status(401).json({
            msg:"Something went wrong",
            error:err
        });

    }
}

exports.getUser=async (req,res)=>{
    try{

        if(!isValidObjectId(req.params.id)){
            return res.end('Invalid object id');
        }

        const result= await userModel.findById(req.params.id);

        res.status(200).json({
            status:"success",
            data:{
                result
            }
        });
        
    }catch(err){

        console.log(err.stack);
        res.status(401).json({
            msg:"Something went wrong",
            error:err
        });

    }
}

// UPDATE
exports.updateUser=async (req,res)=>{
    try{

        if(!isValidObjectId(req.params.id)){
            return res.end('Invalid object id');
        }

        const result= await userModel.findByIdAndUpdate(req.params.id,req.body,{new : true, runValidators:true});

        res.status(201).json({
            status:"success",
            data:{
                result
            }
        });
        
    }catch(err){

        console.log(err.stack);
        res.status(401).json({
            msg:"Something went wrong",
            error:err
        });

    }}
// DELETE
exports.deleteUser= async (req,res)=>{
    try{

        if(!isValidObjectId(req.params.id)){
            return res.end('Invalid object id');
        }

        const result= await userModel.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status:"success"
        });
        
    }catch(err){

        console.log(err.stack);
        res.status(401).json({
            msg:"Something went wrong",
            error:err
        });

    }
}