const express = require("express");
const {register,login , getUsersByHobby , addHobby , getAllUsers} = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/addHobby', auth, addHobby);
router.get('/getUsersByHobby/:hobbyName', getUsersByHobby);
router.get('/getAllUsers', getAllUsers);

module.exports = router;