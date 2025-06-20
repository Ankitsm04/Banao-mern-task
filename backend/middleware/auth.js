const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) return res.status(401).json({message: "Auth Denied"});

    try{
        const verfied = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verfied.id;
        next();
    } catch (err) {
        res.status(400).json({message: "Invalid Token"});
    }
};

module.exports = auth;