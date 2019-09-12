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
         .required(),
      password: joi
         .string()
         .min(8)
         .required(),
      phone: joi
         .string()
         .min(8)
         .allow(""),
      registerDate: joi.string().min(3)
   };
   return joi.validate(data, schema);
};
const loginValSchema = data => {
   console.log(data);
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
module.exports.registerSchema = registerSchema;
module.exports.loginValSchema = loginValSchema;
