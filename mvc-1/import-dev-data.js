const dotenv=require('dotenv');
const fs=require('fs')
const Tour=require('./models/tour');
dotenv.config({path:'./config.env'})
const mongoose=require('mongoose');
// process.env.DB_URI || 

const dbURI=process.env.DB_URI_LOCAL;


mongoose.connect(dbURI).then(conn=>{
    console.log(`Db connection successful on ${dbURI}`);
}).catch(err=>{
    console.log("An error occured");
})


const tours=JSON.parse(fs.readFileSync('tours-simple.json','utf-8'));

const importData=async()=>{
    try{

        await Tour.create(tours);
        console.log("data loading done");
        process.exit();

    }catch(err){
        console.log(err);
    }
}


const deleteAllData=async()=>{
    try {
        
        await Tour.deleteMany();
        console.log('Deletion successful');
        process.exit();

    } catch (err) {
        console.log(err);
    }

}


// console.log(process.argv);


if(process.argv[2]==='--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteAllData();
}
