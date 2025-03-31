import Joi from "joi";

const validateRegisterInput = (input) => {
  const schema = Joi.object({
    userName: Joi.string().max(50),
    password: Joi.string().max(255).required().min(8),
    email: Joi.string().max(255).required().email(),
    upiId: Joi.string().required(),
  });

  return schema.validate(input);
};

const userVerification = (input) => {
  const schema = Joi.object({
    otp: Joi.string().max(4).min(4).required(),
    email: Joi.string().max(255).required().email(),
    for: Joi.string().required().valid("register", "forgotPassword"),
  });

  return schema.validate(input);
};

const validateLogInInput = (input) => {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: Joi.string().max(255).required().min(8),
  });

  return schema.validate(input);
};

const validateResetInput = (input) => {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: Joi.string().max(255).required().min(8),
  });

  return schema.validate(input);
};

export {
  validateRegisterInput,
  userVerification,
  validateLogInInput,
  validateResetInput,
};
