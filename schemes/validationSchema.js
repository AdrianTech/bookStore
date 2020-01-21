const joi = require("@hapi/joi");
const registerSchema = data => {
  const schema = {
    fullname: joi
      .string()
      .min(5)
      .required(),
    email: joi
      .string()
      .min(6)
      .required()
      .email(),
    nickName: joi
      .string()
      .min(3)
      .max(12)
      .required(),
    password: joi
      .string()
      .min(8)
      .required(),
    phone: joi
      .string()
      .min(8)
      .allow(""),
    registerDate: joi.string().min(3),
    isChatActive: joi.boolean()
  };
  return joi.validate(data, schema);
};
const loginValSchema = data => {
  const schema = {
    email: joi
      .string()
      .min(3)
      .required()
      .email(),
    password: joi
      .string()
      .min(8)
      .required()
  };
  return joi.validate(data, schema);
};
const updateSchema = data => {
  const schema = {
    fullname: joi
      .string()
      .allow("")
      .trim()
      .min(5)
      .strict(),
    email: joi
      .string()
      .email()
      .allow("")
      .trim()
      .min(6)
      .strict(),
    nickName: joi
      .string()
      .allow("")
      .trim()
      .min(3)
      .max(12)
      .strict(),
    password: joi
      .string()
      .trim()
      .required()
      .min(8)
      .strict(),
    phone: joi
      .string()
      .allow("")
      .trim()
      .min(8)
      .strict(),
    newPassword: joi
      .string()
      .allow("")
      .trim()
      .min(8)
      .strict()
  };
  return joi.validate(data, schema);
};
const productValidation = data => {
  const schema = {
    author: joi
      .string()
      .min(2)
      .max(1000)
      .required(),
    title: joi
      .string()
      .required()
      .min(3)
      .max(100),
    pages: joi
      .string()
      .required()
      .min(2)
      .max(5000),
    desc: joi
      .string()
      .required()
      .min(8)
      .max(1000),
    print: joi
      .string()
      .required()
      .min(2)
      .max(100),
    price: joi
      .string()
      .required()
      .max(10),
    date: joi
      .string()
      .required()
      .min(4)
      .max(4),
    isActive: joi.boolean().required(),
    count: joi.string().required(),
    total: joi.string().required()
  };
  return joi.validate(data, schema);
};
module.exports.registerSchema = registerSchema;
module.exports.loginValSchema = loginValSchema;
module.exports.productValidation = productValidation;
module.exports.updateSchema = updateSchema;
