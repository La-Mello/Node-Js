
// CREATE
exports.createTodo=(req,res)=>{
    res.status(200).json({msg:"create todos works"});
}
// READ
exports.getTodos=(req,res)=>{
    res.status(200).json({msg:"get todos works"});
}

exports.getTodo=(req,res)=>{
    res.status(200).json({msg:"get todo works"});
}

// UPDATE
exports.updateTodo=(req,res)=>{
    res.status(200).json({msg:"update todo works"});
}
// DELETE
exports.deleteTodo=(req,res)=>{
    res.status(200).json({msg:"delete todo works"});
}