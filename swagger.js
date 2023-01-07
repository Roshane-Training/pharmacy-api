const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// API Meta Info
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Pharmacy App API',
			description:
				'An API to simulate users making purchases of prescribed and over the counter drugs and other medical supplies. Also making and filling prescriptions.',
			version: '1.0.0',
		},
		servers: [
			{
				url: 'http://localhost:8080/api/v1',
			},
		],
		components: {
			schemas: {
				User: {
					type: Object,
					properties: {
						id: {
							type: String,
							description: 'Mongoose Object ID as a String',
							example: '63228ae60e8b432603389f39',
						},
						fullName: {
							type: String,
							description: 'Name of this User',
							example: 'Geovaunie Golding',
						},
						image: {
							type: String,
							description: 'A picture of this User',
							example: 'geovaunie.jpg',
						},
						phoneNumber: {
							type: String,
							description: 'Contact or Telephone Number of this User',
							example: '1234567890',
						},
						email: {
							type: String,
							description: 'Email Address of this User',
							example: 'geovauniegolding@mail.com',
						},
						password: {
							type: String,
							description: 'Password created by this User',
							example: '1234$%1234',
						},
						role: {
							type: String,
							description: 'The Account Type assigned to this User',
							example: 'Customer',
						},
					},
				},
				Doctor: {
					type: Object,
					properties: {
						id: {
							type: String,
							description: 'Mongoose Object ID as a String',
							example: '63228ae60e8b432603389f39',
						},
						fullName: {
							type: String,
							description: 'Name of this Doctor',
							example: 'Sishannia Harrison',
						},
						title: {
							type: String,
							description: 'Title used to address this Doctor',
							example: 'Dr.',
						},
						image: {
							type: String,
							description: 'A picture of this Doctor',
							example: 'DrSishanniaHarrison.jpg',
						},
						ratings: {
							type: Array,
							description:
								'A specific range or indicator that shows the level of preference or popularity of this Doctor',
							example: '4 or ****',
						},
						patients: {
							type: Number,
							description: 'The amount of Patients seen by this Doctor',
							example: '12',
						},
						experience: {
							type: Array,
							description:
								'An indicator that shows the current level of experience for this Doctor',
							example: '7/10',
						},
						about: {
							type: String,
							description: 'Brief Bio Data for this Doctor',
							example:
								'A Doctor and Private Practitioner of Medicine. The Kingston Public Hospital - Female Ward(Geriatrics and Minor Operations)',
						},
						phoneNumber: {
							type: String,
							description: 'Contact or Telephone Number of this Doctor',
							example: '1234567890',
						},
						email: {
							type: String,
							description: 'Email Address of this Doctor',
							example: 'Dr.S.Harrison@mail.com',
						},
						password: {
							type: String,
							description: 'Password created by this Doctor',
							example: '1234$%1234',
						},
						role: {
							type: String,
							description: 'The Account Type assigned to this User',
							example: 'Doctor',
						},
					},
				},
				Product: {
					type: Object,
					properties: {
						id: {
							type: String,
							description: 'Mongoose Object ID as a String',
							example: '63228ae60e8b432603389f39',
						},
						name: {
							type: String,
							description: 'Name of this Product',
							example: 'Panadol Multi-Symptoms Extra Strenght',
						},
						image: {
							type: String,
							description: 'Product Image for this Product',
							example: 'panadol.jpg',
						},
						description: {
							type: String,
							description: 'Product Information for this Product',
							example:
								'Paracetamol, also known as acetaminophen, is a medication used to treat fever and mild to moderate pain. Common brand names include Tylenol and Panadol',
						},
						price: {
							type: String,
							description: 'Cost of this Product',
							example: '$250.00',
						},
						rating: {
							type: Number,
							description:
								'Number range from between 1 to 5 that indicates the level of preference or popularity of this Product',
							example: '4',
						},
						main_categoryId: {
							type: String,
							description:
								'Mongoose Object ID as a String of the Category of this Product from the Categories Collection',
							example: '636a5ee446854e5b6141e295',
						},
						sub_categoryId: {
							type: String,
							description:
								'Mongoose Object ID as a String of the Category of this Product from the Sub Categories Collection',
							example: '636a65e3d095415777ea8c6a',
						},
					},
				},
				Category: {
					type: Object,
					properties: {
						id: {
							type: String,
							description: 'Mongoose Object ID as a String',
							example: '63228ae60e8b432603389f39',
						},
						name: {
							type: String,
							description: 'Name or Title of this Category',
							example: 'Over the Counter',
						},
					},
				},
				SubCategory: {
					type: Object,
					properties: {
						id: {
							type: String,
							description: 'Mongoose Object ID as a String',
							example: '63228ae60e8b432603389f39',
						},
						name: {
							type: String,
							description: 'Name or Title of this Sub Category',
							example: 'Paracetamols',
						},
						main_categoryId: {
							type: String,
							description:
								'Mongoose Object ID as a String of the Category that this Sub Category is grouped with',
							example: '636a5ee446854e5b6141e295',
						},
					},
				},
			},
		},
	},
	apis: [
		'./routes/user.routes.js',
		'./routes/auth.routes.js',
		'./routes/doctor.routes.js',
		'./routes/products.routes.js',
		'./routes/main_categories.route.js',
		'./routes/sub_categories.route.js',
	],
}

// Docs in JSON Format
const swaggerSpec = swaggerJSDoc(options)

// Serve Swagger Docs Function
const swaggerDocs = (app, port) => {
	// route to the docs
	app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

	app.get('/api/v1/docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(swaggerSpec)
	})

	console.log(`Version 1 Docs are available on http://localhost:${port}/api/v1/docs`)
}

module.exports = { swaggerDocs }
