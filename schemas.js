const Joi = require("joi");

//Validation form through Joi
module.exports.playgroundSchema = Joi.object({
  playground: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating:Joi.number().required(),
        body:Joi.string().required()
    }).required()
})