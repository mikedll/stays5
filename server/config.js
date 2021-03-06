
const Joi = require('joi')

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGO_HOST: Joi.string()
    .description("Mongo DB host url")
    .default("localhost"),
  MONGO_PORT: Joi.number()
    .default(27017),
  MONGO_DATABASE: Joi.string()
    .description("Mongo database name")
    .default("stays5dev"),
  MONGODB_URI: Joi.string()
}).unknown().required()

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if(error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongo: {
    uri: envVars.MONGODB_URI || `mongodb://${envVars.MONGO_HOST}:${envVars.MONGO_PORT}/${envVars.MONGO_DATABASE}`,
    connectionOpts: { useNewUrlParser: true }
  }
}

module.exports = config
