const express=require('express')
const router=express.Router();
const {check,validationResult}=require('express-validator/check');
const User=require('../../models/User');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const config=require('config');

//@route     post api/user
//@desc      registration route
//@access    public

router.post('/',[
    check('name','enter name').not().isEmpty(),
    check('email','enter valid email').isEmail(),
    check('password','enter min 6 password').isLength({min:6})
],async(req,res)=>
    { const errors=validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
        }
        const {name,password,email}=req.body;
        try{
    //identifying duplicate user
        let user=await User.findOne({email});
        if(user){
        res.status(400).json({error:[{msg:'user already exists'}]});
                }
    //get gravatar
        const avatar=gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })
    //encrypt password
    user=new User(
        {
            name,
            password,
            avatar,
            email
        }
    )
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
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