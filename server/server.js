import express from 'express'
import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser'
import userRoutes from './routes/auth.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import departureRoutes from './routes/departures.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'
import vehicleCategoryRoutes from './routes/vehicleCatgory.routes.js'
import financeRoutes from './routes/finance.routes.js'
import smsRoutes from './routes/sms.routes.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const corsOptions = {
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
};

app.use(cors(corsOptions));


//DB
import './connection/db.js'

/**HTTP get request */
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request')
})

app.use('/api/auth', userRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/departure', departureRoutes)
app.use('/api/vehicle', vehicleRoutes)
app.use('/api/finance', financeRoutes)
app.use('/api/sms', smsRoutes)
app.use('/api/vehicleCategory', vehicleCategoryRoutes)


const PORT = process.env.PORT || 9004


app.listen(PORT, () => {console.log(`server runing on http://localhost:${PORT}`)})