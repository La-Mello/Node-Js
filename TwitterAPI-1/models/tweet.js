const mongoose=require('mongoose');
const bcrypt =require('bcryptjs');


const tweetSchema=mongoose.Schema({

    tweetedBy:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:[true,'a tweet cannot be empty'],
        minlength:[5,'short message for a tweet'],
        maxlength:[20,'create a new thread']
    },
    //! to store the links to the profiles of the ppl who liked the tweet
    //! the size of the array will be the amount of likes
    likes:{
        type:[String]
    },

    retweets:{
        type:[String]
    },

    Comments:{
        type:[String]
    },

    hashTags:{
        type:[String]
    },

    dateTweeted:{
        type:Date,
        default:Date.now()
    },

    insights:[String],

    deleted:{
        type:Boolean,
        default:false
    }

});


// encrypting the message to the database
tweetSchema.pre('save', async function(){

});

const Tweet=mongoose.model('Tweet',tweetSchema);

module.exports=Tweet;