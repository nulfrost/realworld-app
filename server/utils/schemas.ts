import Validator from "fastest-validator";

const v = new Validator();

const loginSchema = {
  email: { type: "email" },
  password: "string",
};

const registrationSchema = {
  username: "string|min:5|max:20",
  email: { type: "email" },
  password: "string|min:7|max:30",
};

export = {
  loginValidator: v.compile(loginSchema),
  registerValidator: v.compile(registrationSchema),
};
