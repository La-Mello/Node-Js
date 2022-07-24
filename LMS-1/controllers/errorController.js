module.exports=(err,req,res,next)=>{

    // console.log(err);
    res.status(err.StatusCode || 500).json({
        status:`${err.StatusCode}`.startsWith('4')?'fail':'error',
        message:err.message || err,
        stack:err.stack
    })
    
}