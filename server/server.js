import express from 'express'
import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser'
import userRoutes from './routes/auth.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import departureRoutes from './routes/departures.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'
import vehicleCategoryRoutes from './routes/vehicleCatgory.routes.js'


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//DB
import './connection/db.js'

/**HTTP get request */
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request')
})

app.use('/api/user', userRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/departure', departureRoutes)
app.use('/api/vehicle', vehicleRoutes)
app.use('/api/vehicleCategory', vehicleCategoryRoutes)


const PORT = process.env.PORT || 9004

app.listen(PORT, () => {console.log(`server runing on http://localhost:${PORT}`)})