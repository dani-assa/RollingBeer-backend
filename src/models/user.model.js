import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El campo es requerido"],
    },
    userName: {
      type: String,
      required: [true, "El campo es requerido"],
    },
    email: {
      type: String,
      required: [true, "El campo es requerido"],
    },
    dni: {
      type: String,
      required: [true, "El campo es requerido"]
    },
    password: {
      type: String,
      required: [true, "El campo es requerido"],
    },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
    disabled: {
      type: Boolean,
      defaul: false,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
