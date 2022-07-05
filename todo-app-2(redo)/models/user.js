const validator=require('validator')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,'a user must have a username'],
        maxlength:[8,'a username cannot exceed 8 characters'],
        lowercase:true
    },

    email:{
        type:String,
        unique:true,
        validate:[validator.isEmail,'provide a valid email'],
        lowercase:true
    },

    password:{
        type:String,
        minlength:[8,'a password must have a minimim of 8 characters'],
        required:[true,'please provide a password'],
        select:false
    },

    passwordConfirm:{
        type:String,
        required:[true,'password confirm field cannot be blank'],
        validate:[function(passwordConfirm){return passwordConfirm === this.password},'password and password confirm mismatch']
    },

    reqisteredAt:{
        type:Date,
        default:Date.now()
    },

    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
});


// encrypting the password before save
userSchema.pre('save',async function(next) {
    this.password=await bcrypt.hash(this.password,12);
    // ensuring the password confirm field is not added to the database
    this.passwordConfirm=undefined;
    next();
});

// function to verify the password during logging in using instance methods
// userSchema.methods.verifyPassword=function(inputPassword,userPassword) {
//     return bcrypt.compare(inputPassword,userPassword);
// }

const User=mongoose.model('User',userSchema);

module.exports=User;