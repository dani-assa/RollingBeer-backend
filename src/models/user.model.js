const { Schema, model } = require("mongoose");

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

module.exports = model("User", userSchema);
