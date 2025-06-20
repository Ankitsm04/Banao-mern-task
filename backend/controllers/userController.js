const User = require("../models/User");
const Hobby = require("../models/Hobby");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    const {fullName, email,password } = req.body;
    const hased = await bcrypt.hash(password,8);
    try{
        const user = await User.create({fullName, email, password : hased});
        res.status(201).json(user);
    }catch(err){
        res.status(400).json({message : err.message});  
    } 
}

exports.login = async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message : "Invalid Email"});
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message : "Invalid Password"});
    }
    const token = jwt.sign({id : user._id }, process.env.JWT_SECRET , {expiresIn : "1d"});
    res.status(200).json({token});
}

exports.addHobby = async (req,res) => {
    const {hobbyName} = req.body;
    const user = await User.findById(req.user);
    const hobby = await Hobby.findOne({name: hobbyName});
    if(!hobby) return res.status(404).json({message: "Hobby not found"});

    if(!user.hobbies.includes(hobby._id)){
        user.hobbies.push(hobby._id);
        await user.save();
    }
    res.json({message : "Hobby added" , hobbies : user.hobbies});
}

exports.getUsersByHobby = async (req,res) => {
    const {hobbyName} = req.params;
    const hobby = await Hobby.findOne({name : hobbyName});
    if(!hobby) return res.status(404).json({message: "Hobby not found"});

    const users = await User.find({hobbies : hobby._id }).populate("hobbies");
    res.json(users);
}

exports.getAllUsers = async (req,res) => {
    const users = await User.find().populate("hobbies");
    res.json(users);
}
