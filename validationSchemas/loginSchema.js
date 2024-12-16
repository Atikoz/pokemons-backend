import Joi from "joi";

const loginSchema = Joi.object({
  address: Joi.string().required(),
  token: Joi.string().required(),
  signature: Joi.string().required()
});

export default loginSchema