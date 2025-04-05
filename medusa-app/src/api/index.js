// src/api/index.js

const express = require("express");
const cors = require("cors");
const { getConfigFile } = require("medusa-core-utils");
const { registerRoutes } = require("@medusajs/medusa/dist/api");
const { handleError } = require("@medusajs/medusa/dist/api/middlewares");

// Load config
const { configModule } = getConfigFile(process.cwd(), "medusa-config");
const { projectConfig } = configModule;

// Initialize Express app
const app = express();

// CORS settings
const storeCorsOptions = {
  origin: projectConfig.store_cors.split(","),
  credentials: true,
};

const adminCorsOptions = {
  origin: projectConfig.admin_cors.split(","),
  credentials: true,
};

// Application routes and middleware
function initializeApp() {
  // Body parser
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // Add custom routes before Medusa's routes
  
  // Health check endpoint for AWS
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString()
    });
  });

  // Custom API endpoint for the assignment
  app.get("/assignment-info", (req, res) => {
    res.json({
      name: "Medusa Assignment App",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Medusa's core API routes will be registered here
  
  // Error handling
  app.use(handleError);
}

// Export app
module.exports = { app, initializeApp };