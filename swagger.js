const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// API Meta Info
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Pharmacy App API",
            description: "An API to simulate users making purchases of prescribed and over the counter drugs and other medical supplies. Also making and filling prescriptions.",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:8080/api/v1"
            }
        ]
    },
    apis: [ "./routes/user.routes.js", "./routes/auth.routes.js", "./routes/doctor.routes.js", "./routes/products.routes.js", "./routes/main_categories.route.js", "./routes/sub_categories.route.js", "./SCHEMA/user.js", "./SCHEMA/doctor.js", "./SCHEMA/products.js", "./SCHEMA/main_categories.js", "./SCHEMA/sub_categories.js" ]
}

// Docs in JSON Format
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger Docs Function
const swaggerDocs = ( app, PORT ) => {
    // route to the docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })

    console.log(
        `Version 1 Docs are available at http://localhost:${PORT}/api/v1/docs`
    );
}

module.exports = { swaggerDocs }
