import Validator from "fastest-validator";

const v = new Validator();

const loginSchema = {
  email: { type: "email" },
  password: "string",
};

const registrationSchema = {
  username: { type: "string|min:5|max:10" },
  email: { type: "email" },
  password: { type: "string|min:7|max:20" },
};

export = {
  loginValidator: v.compile(loginSchema),
  registerValidator: v.compile(registrationSchema),
};
