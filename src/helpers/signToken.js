import Jwt from "jsonwebtoken";
import { ADMIN_KEY, TOKEN_SECRET, USER_KEY } from "../server/server.js";

export const signToken = (user) => {
  const signedToken = Jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    TOKEN_SECRET
  );

  const key = user.role === "client" ? USER_KEY : ADMIN_KEY;

  const authObj = {
    token: signedToken,
    key: key,
  };

  return authObj;
};
