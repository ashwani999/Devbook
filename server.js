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
//init middleware
app.use(express.json());

//defining routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
console.log(`app running on ${PORT}`)


app.listen(PORT);