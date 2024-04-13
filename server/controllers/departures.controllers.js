import Departuremodel from "../models/Departures.js"


export async function create(req, res){
    const { vechicletype, vechicleid, numberofpassengers, totalamount, fullpayment, balancepayment, travelingfrom, travelingto, drivername, preparedby, departuretime } = req.body
    console.log(req.body)
    try {
       //if(!vechicletype || !vechicleid || !numberofpassengers || !totalamount || !fullpayment || !travelingfrom || !travelingto || !drivername || !preparedby || !departuretime){
        //return res.status(404).json({ success: false, data: 'All Feild required'})
       //}
       if(fullpayment === 'NO' && !balancepayment){
        return res.status(404).json({ success: false, data: 'Balance Payment amount needed'})
       }

       let receiptId
       let isUnique = false

       while (!isUnique){
           receiptId = generateRandomSixDigitId();
           const existingReceiptId = await Departuremodel.findOne({ receiptId: receiptId  })
           if(!existingReceiptId){
               isUnique = true
           }
       }

       const newDeparture = new Departuremodel({
        vechicletype, vechicleid, numberofpassengers, totalamount, fullpayment, balancepayment, travelingfrom, travelingto, drivername, preparedby, receiptId, departuretime
       })
       await newDeparture.save()

       console.log('NEE', newDeparture)

       res.status(201).json({ success: true, data: 'Departure data created successful'})
    } catch (error) {
        console.log('ERROR CREATING NEW DEPARTURE', error)
        res.status(500).json({ success: false, data: 'Failed to create departure' })   
    }

}

export async function update(req, res){
    const { id } = req.body
    console.log('ID', id)
    try {
        const isExist = await Departuremodel.findById({ _id: id})
        if(!isExist){
            return res.status(404).json({ success: false, data: 'Vehicle not Found'})
        }
        console.log('OLD',isExist)
        const updateDeparture = await Departuremodel.findByIdAndUpdate(
            id,
            {
               $set: {
                numberofpassengers: req.body.numberofpassengers,
                totalamount: req.body.totalamount,
                fullpayment: req.body.fullpayment,
                balancepayment: req.body.balancepayment,
                updatedby: req.body.updatedby
               } 
            },
            {new: true}
        )
        await updateDeparture.save()
        console.log('NEW',updateDeparture)

        res.status(200).json({ success: true, data: 'Depature updated successfully'})
    } catch (error) {
        console.log('UNABLE TO UPDATE VEHICLE', error)
        res.status(500).json({ success: false, data: 'Unable to update vehicle'})
    }
}

export async function getAllDeparture(req, res){

    try {
        const departure = await Departuremodel.find()

        res.status(200).json({ success: true, data: departure })
    } catch (error) {
        console.log('COULD NOT GET ALL DEPARTURE', error)
        res.status(500).json({ success: false, data: 'Unable to get all departure data'})
    }
}

export async function getADeparture(req, res){
    const { id } = req.params
    try {
        const departures = await Departuremodel.findById({ _id: id })

        res.status(200).json({ success: true, data: departures })
    } catch (error) {
        console.log('COULD NOT GET A DEPARTURW', error)
        res.status(500).json({ success: false, data: 'Unable to get departure data'})
    }
}

export async function getVehicleDepartures(req, res){
    const {id} = req.params
    try {
        const departure = await Departuremodel.find({ vechicleid: id })

        res.status(200).json({ success: true, data: departure })
    } catch (error) {
        console.log('COULD NOT GET ALL DEPARTURE FOR VEHCILE', error)
        res.status(500).json({ success: false, data: 'Unable to get all departure for vehicle data'})
    }
}

// Function to generate a random seven-digit number
function generateRandomSixDigitId() {
    return Math.floor(1000000 + Math.random() * 9000000); // Generate a number between 100000 and 999999
}