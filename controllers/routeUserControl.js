const User  =  require("../models/user");
const bcrypt =  require("bcrypt")
const jwt =  require("jsonwebtoken");
const { use } = require("../routes/crud");
require('dotenv').config();

const userRegister = async (req,res) =>{
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) res.status(400).send("Email already exists");

    const salt =  await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hashSync(req.body.password,salt);


    const user =  new User({
        name : req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    try{
        const savedUser = await user.save();
        res.send("saveduser");
    }catch(error){
        console.log("abc");
        res.status(400).send("error");
        
    }
}

const userLogin = async (req,res) =>{

    const user = await User.findOne({email:req.body.email})
    if(!user) res.status(400).send("Email does't exists");
   
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword)res.status(400).send("Invalid Password");

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
}


const userLogout = (req,res) =>{
    
}

module.exports = {userRegister,userLogin,userLogout,};