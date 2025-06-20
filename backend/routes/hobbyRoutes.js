const Hobby = require("../models/Hobby");
const express = require("express");

const router = express.Router();

router.post('/', async (req,res) => {
    try{
        const { name } = req.body;
        const hobby = await Hobby.create({name : name.toLowerCase()});
        res.status(200).json({message : "Hobby created", hobby : hobby});
    }catch(err){
        res.status(400).json({message : err.message});
    }
});

module.exports = router;