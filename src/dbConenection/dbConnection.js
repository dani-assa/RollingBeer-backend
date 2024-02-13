const mongoose  = require("mongoose");

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Estamos conectados a la db');
  } catch (error) {
    console.log(error.message);
  }
};

dbConn();