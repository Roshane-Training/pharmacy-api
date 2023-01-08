require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const ip = require('ip')
const path = require('path')
const morgan = require('morgan')

const PORT = process.env.PORT || 8080
const NAME = process.env.NAME || 'amberapp3'

const { swaggerDocs: V1SwaggerDocs } = require('./swagger')

/* Middlewares */
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public'), { redirect: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors([process.env.FRONTEND_URL, process.env.PRODUCTION ? undefined : '*']))

/* Routers */
const { DevLog } = require('./lib/helpers')
const indexRouter = require('./routes/index.routes')
const usersRouter = require('./routes/user.routes')
const doctorsRouter = require('./routes/doctor.routes')
const authRouter = require('./routes/auth.routes')
const productsRouter = require('./routes/products.routes')
const categoriesRouter = require('./routes/categories.routes')
// const subCategoriesRouter = require('./routes/sub_categories.route')
const assetRouter = require('./routes/asset.routes')
//
//
//
const products = require('./models/products')
const categories = require('./models/categories')
const doctor = require('./models/doctor')
const user = require('./models/user')
//
//
//

// API Version
const API_VER = '/api/v1'

app.use(API_VER, indexRouter)
app.use(API_VER + '/users', usersRouter)
app.use(API_VER + '/doctors', doctorsRouter)
app.use(API_VER + '/auth', authRouter)
app.use(API_VER + '/products', productsRouter)
app.use(API_VER + '/categories', categoriesRouter)
// app.use(API_VER + '/subcategories', subCategoriesRouter)
app.use(API_VER + '/assets', assetRouter)

/* Start Express App */
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`\r==========================================================\n
				\r\t[*] Endpoints for \x1b[34m${NAME}\x1b[0m are available [*]\n
				\r\t[*] Local: \x1b[4m\x1b[32mhttp://localhost:${PORT}/api/v1\x1b[0m\r
				\r\t[*] Your Network: \x1b[4m\x1b[32m${`http://${ip.address()}`}:${PORT}/api/v1\x1b[0m\r
				\r\t[*] MongoDB URI: ${process.env.MONGODB_URI}\r
				\r\n==========================================================`
			)
			V1SwaggerDocs(app, PORT)
		})
	})
	.catch((err) => {
		console.log('[!] Failed to connect MongoDB')
		DevLog(err)
	})

module.exports = app
