const express=require('express')
const router=express.Router();
const {check,validationResult}=require('express-validator/check');

//@route     post api/user
//@desc      registration route
//@access    public

router.post('/',[
    check('name','enter name').not().isEmpty(),
    check('email','enter valid email').isEmail(),
    check('password','enter min 6 password').isLength({min:6})
],(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    res.send("user route")})



module.exports=router;