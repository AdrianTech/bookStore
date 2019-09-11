const joi = require("@hapi/joi");
const registerSchema = data => {
   const schema = {
      firstName: joi
         .string()
         .min(2)
         .required(),
      lastName: joi
         .string()
         .min(3)
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
