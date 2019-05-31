const express=require('express')
const router=express.Router();
const auth=require('../../middleware/auth')
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const config=require('config');
const {check,validationResult}=require('express-validator/check');
const User=require('../../models/User');

//@route     GET api/auth
//@desc      test route
//@access    public
router.get('/',auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }
catch(err){
    console.error(err);
    res.status(500).json({msg:'server error'})
}
})
    router.post('/',[
        check('email','enter valid email').isEmail(),
        check('password','enter password').exists()
    ],async(req,res)=>
        { const errors=validationResult(req);
            if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()});
            }
            const {password,email}=req.body;
            try{
                
        //identifying user
            let user=await User.findOne({email});
            if(!user){
            res.status(400).json({error:[{msg:'invalid credentials'}]});
                    }
        // checking passwords
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            res.status(400)
            .json({msg:'invalid credentials'})
        }
        //return jsonwebtoken
        const payload={
            user:{
                id:user.id
            }
        };
        jwt.sign(payload,config.get('jwtsecrets'),{
            expiresIn:36000},
            (err, token)=>{
                if(err)
                throw err;
                res.json({token});
    
            }
            )
         
            }
            catch(err){
            console.error(err.message);
            res.status(500).send("server error");
                }
        });
           



module.exports=router;