const Joi = require("joi");

const generateCertificateSchema = Joi.object({
  employeeName: Joi.string().required(),
  courseName: Joi.string().required(),
  courseTaken: Joi.string().required(),
  validUntil: Joi.string().required(),
  certificateId: Joi.string().required(),
  picTitle: Joi.string().required(),
  picSignatureBase64: Joi.string().required(),
  picName: Joi.string().required(),
});

module.exports = {
  generateCertificateSchema,
};
