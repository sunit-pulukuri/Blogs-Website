const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.register = async(req,res)=>{
    const {username, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){ return res.status(400).json({msg: "User already exists with the same email"}) }

        //hashing the password before storing it into the DB
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt)


        //Enter the new user deets in the db with hashed password
        user = await User.create({username, email, password : hashedPassword});

        const token = await jwt.sign({name : username ,id : user._id}, process.env.JWT_SECRET,{expiresIn : '1h'});
        res.status(200).json({token});
    }catch(e){
        res.status(500).json({message : "Server error: Couldn't register the user"})
    }
}


exports.login = async (req,res)=>{
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email})
        if(!user){return res.status(404).json({message : "Could not find the user, please register"})}

        //verify password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){return res.status(400).json({msg : "Invalid credentials"})}

        //creating an auth token
        const token = jwt.sign({id : user._id},process.env.JWT_SECRET, {expiresIn:'1h'})
        res.status(200).json({token})
    }catch(err){
        res.status(500).json({message : e.message})
    }
}

exports.getUser = async(req,res)=>{
    const {id} = req.params;
    try{
        let user = await User.findById(id);
        if(!user){return res.status(404).json({message:"User not found"})}
        res.status(200).json(user)
    }catch(e){
        res.status(500).json({messahe : e.message})
    }
}