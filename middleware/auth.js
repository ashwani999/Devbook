const config=require('config');
const jwt=require('jsonwebtoken');


module.exports=(req,res,next)=>{
    //get token
    const token=req.header('x-auth-token');
    //check if not token
    if(!token)
    res.status(401).json({msg:'no token , no authorization'})
    //verify token
    try{
    const decoded = jwt.verify(token,config.get('jwtsecrets'));
    req.user=decoded.user;
    next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({msg:'invalid token'});
    }
}