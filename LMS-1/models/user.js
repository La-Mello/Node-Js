// the user model
const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt =require('bcryptjs');
const userSchema=mongoose.Schema({
    name:{
        type: String,
        minlength:[8,'a user name must be longer ir equal to 8 characters'],
        required:[true,'a username is required']
    },

    email:{
        type:String,
        lowercase:true,
        validate:[ validator.isEmail,'provide a valid email'],
        required:[true,'an email is required for official communication'],
        unique:true
    },

    password:{
        type: String,
        required:[true,'provide a password'],
        select:false,
        minlength: [8,'a password must exceed 8 characters']
    },

    passwordConfirm:{
        type: String,
        required:[true,'a password confirmation must be  provided'],
        validate:{
            validator: function(el){ return el===this.password;},
            message:'password mismatch'
        }
    },

    role:{
        type:String,
        enum:['admin','default','parent','lecturer']
        //admins to sign up/in with specific previledges
    }  
});


// encrypting the passwrd
userSchema.pre('save',async function(next){
    
    if(!this.isModified('password')) return next();
 
    this.password=await bcrypt.hash(this.password,12);
  
    this.passwordConfirm=undefined;
    next();
});

userSchema.methods.checkPassword= function (inputPassword,userPassword){
    return bcrypt.compare(inputPassword,userPassword);
}

const User=mongoose.model('User',userSchema);

module.exports=User;