import Validator from "fastest-validator";

const v = new Validator();

const loginSchema = {
  email: { type: "email" },
  password: "string",
};

const registrationSchema = {
  username: { type: "string" },
  email: { type: "email" },
  password: { type: "string" },
};

export = {
  loginValidator: v.compile(loginSchema),
  registerValidator: v.compile(registrationSchema),
};
