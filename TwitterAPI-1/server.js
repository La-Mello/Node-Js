require('dotenv/config');
const mongoose=require('mongoose');
const app=require('./app');

const PORT= process.env.PORT || 3000;


//database connection
mongoose.connect(process.env.DB_URI,()=>{

    console.log('====================================');
    console.log(`Database connection at ${process.env.DB_URI}`);
    console.log('====================================');

}).catch(err=>{
    console.log(err);
    process.exit(1);
})


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
});
