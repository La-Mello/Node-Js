const mongoose=require('mongoose');

const courseSchema=mongoose.Schema({
    title:{
        type:String
    },

    code:{
        type:Number
    },

    department:{
        type:String
    }
})