"use strict";

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const swaggerDocument = JSON.parse(
 fs.readFileSync(path.join(__dirname, "docs", "swagger.json"), "utf8")
);

function setupSwagger(app) {
 app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
