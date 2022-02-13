const Joi =  require("@hapi/joi");
const { join } = require("path/posix");

const schema = {

    name: Joi.string()
        .min(6)
        .max(255)
        .required(),
    email: Joi.string()
         .min(6)
         .required()
         .email(),
 password: Joi.string()
         .min(6)
         .required()

}

module.exports = {schema};