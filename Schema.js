const Joi = require("joi");

const listingJoiSchema = Joi.object({
    title: Joi.string().required().default("Untitled Listing"),
    description: Joi.string().allow(''),
    image: Joi.object({
        filename: Joi.string().allow(''),
        url: Joi.string().uri().default("https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")
    }),
    price: Joi.number(),
    location: Joi.string().allow(''),
    country: Joi.string().allow('')
});

module.exports = listingJoiSchema;

const reviewJoiSchema = Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    createdAt: Joi.date().default(() => new Date())
});

module.exports.reviewJoiSchema = reviewJoiSchema;