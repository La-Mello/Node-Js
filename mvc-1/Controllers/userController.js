const User=require('./../models/user');
const catchAsync=require('./../utils/catchAsync');
const appError=require('./../utils/appError');
//handling all user functions
exports.getUserById=catchAsync(async (req,res)=>{
    
    const user=await User.findById(req.params.id);

    res.status(200).json({
        status:"success",
        data:{
            user
        }
    });
})

exports.createUser=catchAsync( async (req,res)=>{

    const user= await User.create(req.body)

    res.status(201).json({
        status:"success",
        data:{
            user
        }
    });
})

exports.updateUser=catchAsync(
     async (req,res)=>{
        //used to make sure the updates align with the schema
        const result=await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true } );
        
        res.status(201).json({
            status:"success",
            data:{
                result
            }
        });
        
    }
)

exports.deleteUser=catchAsync(async (req,res)=>{
    
    const result= await User.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status:"success",
            data:{
                user
            }
        })

    }
)

exports.getUser=catchAsync( async (req,res)=>{

    const users=await User.find();

    res.status(200).json({
        status:"success",
        Number:users.length,
        data:{
            users
        }
    });
    
})

const filterObj=(Obj,...allowedFields)=>{
    const newObj={}

    Object.keys(Obj).forEach(el => {
        if(allowedFields.includes(el)){
            newObj[el]=Obj[el];
        }
    })

    return newObj;
}

exports.updateMe=catchAsync(async (req,res,next)=>{
    // create error if user posts password data
    if(req.body.password || req.body.passwordConfirm){
        return next(new appError('Cannot update password',401));
    }

    // update user

    // filtering te updates
    const updates=filterObj(req.body,'name','email');

    const updatedUser= await User.findByIdAndUpdate(req.user._id,updates,{new:true, runValidators:true});



    res.status(200).json({
        stautus:'success',
        data:{
            updatedUser
        }
    })
    
})
