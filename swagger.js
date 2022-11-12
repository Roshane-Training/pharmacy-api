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
        ],
        components: {
            schemas: {
                User: {
                    type: Object,
                    properties: {
                        id: {
                            type: String,
                            description:"Mongoose Object ID as a String",
                            example: "63228ae60e8b432603389f39"
                        },
                        fullName: {
                            type: String,
                            description: "Name of the User",
                            example: "Geovaunie Golding"
                        },
                        phoneNumber: {
                            type: String,
                            description: "Contact or Telephone Number of the User",
                            example: "1234567890"
                        },
                        email: {
                            type: String,
                            description: "Email Address of the User",
                            example: "geovauniegolding@mail.com"
                        },
                        password: {
                            type: String,
                            description: "Password created by the User",
                            example: "1234$%1234"
                        },
                        role: {
                            type: String,
                            description: "The Account Type assigned to the User",
                            example: "Customer"
                        },
                    }
                }
            }
        }
    },
    apis: [ "./routes/user.routes.js", "./routes/auth.routes.js", "./routes/doctor.routes.js", "./routes/products.routes.js", "./routes/main_categories.route.js", "./routes/sub_categories.route.js" ]
}

// Docs in JSON Format
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger Docs Function
const swaggerDocs = ( app, port ) => {
    // route to the docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })

    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
}

module.exports = { swaggerDocs }
