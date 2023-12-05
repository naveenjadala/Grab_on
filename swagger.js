const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "A simple user API",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZGFsYUBnbWFpbC5jb20iLCJpZCI6MiwiaWF0IjoxNjk3ODA4MjI4LCJleHAiOjE2OTc4NDQyMjh9.PcBFdP-uQfrz7QqxB1l7T8nl6ZiUK30NtSJnb1k5MX0",
      ],
    },
  ],
  apis: ["./src/routes/*.js"], // Path to the API routes folder
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
