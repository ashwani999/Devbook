const express=require('express')
const morgan=require('morgan')
const app=express();
const connectDB=require('./config/db')
app.use(morgan('dev'));

connectDB();
const PORT=process.env.PORT||8000;
app.get('/',(req,res)=>{
    res.send("server rjjhgkkkjjjjunning")
   
});
console.log(`app running on ${PORT}`)


app.listen(PORT);