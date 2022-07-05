const appError=require('./../utils/appError');

module.exports=(err,req,res,next)=>{

    if(err.name === 'TokenExpiredError')err=handleTokenExpiredError(err);

    res.status(err.statCode || 500).json({
        status:(err.status || 'fail'),
        error:err,
        stack:err.stack
    });

}

// FUNCTIONS TO HANDLE DIFFERENT TYPES OF ERRORS
const handleTokenExpiredError=(err)=>{
    return new appError('Time expired.😴Login again..',401);
}
