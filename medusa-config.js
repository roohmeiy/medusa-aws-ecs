// medusa-config.js

const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// This is the place to include plugins or set up configurations
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
      automatic_payment_methods: true,
    },
  },
];

const modules = {};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  // Use local SQLite for development and PostgreSQL/Redis in production
  database_type: process.env.NODE_ENV === "production" ? "postgres" : "sqlite",
  database_url: process.env.DATABASE_URL,
  database_filename: process.env.NODE_ENV === "production" ? undefined : "medusa-db.sql",
  redis_url: process.env.REDIS_URL,
  
  // CORS settings
  store_cors: process.env.STORE_CORS || "http://localhost:8000",
  admin_cors: process.env.ADMIN_CORS || "http://localhost:7000",
  
  // For cloud deployments
  database_extra: process.env.NODE_ENV === "production" ? 
    { ssl: { rejectUnauthorized: false } } : {},
};

// Only include these in a real deployment
if (process.env.NODE_ENV === "production") {
  projectConfig.jwt_secret = process.env.JWT_SECRET;
  projectConfig.cookie_secret = process.env.COOKIE_SECRET;
}

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};