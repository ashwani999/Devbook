const mongoose=require('mongoose')
const config=require('config')

const db=config.get('mongoURI');
//conection to mongoAtlas
const connectDB = async()=>{
    try{
        await mongoose.connect(db,{ useNewUrlParser: true,
            useCreateIndex:true});
    console.log("db connected");
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
    
}

module.exports=connectDB;