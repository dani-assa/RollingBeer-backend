import  Jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "../server/server.js";

export const verifyUserToken = (req,res,next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).json({message: "Acceso denegado"})
  }

  try {
    const verify = Jwt.verify(token, TOKEN_SECRET);
    req.userToken = verify;
    next();
  } catch (error) {
    res.status(400).json({message:"Token invalido"});
  }
};