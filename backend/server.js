const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const  userRoutes = require("./routes/userRoutes");
const hobbyRoutes = require("./routes/hobbyRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api/hobbies',hobbyRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
  })
  .catch(err => console.error(err));