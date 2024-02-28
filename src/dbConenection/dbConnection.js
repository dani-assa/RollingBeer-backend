import  connect from "mongoose";

const dbConn = async () => {
  try {
    await connect(process.env.DB_URI);
    console.log('Estamos conectados a la db');
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConn();