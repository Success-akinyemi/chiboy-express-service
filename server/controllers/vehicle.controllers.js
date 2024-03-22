import VehicleModel from "../models/Vehicle.js"


export async function create(req, res){
    const {registrationnumber, vechicletype, vehiclename, drivername, numberofseat, preparedby} = req.body
    try {

        if(!registrationnumber || !vechicletype || !vehiclename || !drivername || !numberofseat || !preparedby){
            return res.status(400).json({ success: false, data: 'All inputs are required'})
        }

        const regNumberExist = await VehicleModel.findOne({registrationnumber: registrationnumber})
        if(regNumberExist){
            return res.status(400).json({ success: false, data: 'Vehicle with this registration number already exist' })
        }

        const newVehicle = new VehicleModel({
            vechicletype, registrationnumber, drivername, vehiclename, numberofseat, preparedby
        })
        await newVehicle.save()

        console.log(newVehicle)
        res.status(201).json({ success: true, data: 'New Vehicle created'})
    } catch (error) {
        console.log('COULD NOT CREATE NEW VEHICLE', error)
        res.status(500).json({ success: false, data: 'unable to save new vehicle' })
    }
}

export async function update(req, res){
    const { id } = req.params
    console.log('ID', id)
    try {
        const isExist = await VehicleModel.findById({ _id: id})
        if(!isExist){
            return res.status(404).json({ success: false, data: 'Vehicle not Found'})
        }
        console.log('OLD',isExist)
        const updateVehicle = await VehicleModel.findByIdAndUpdate(
            id,
            {
               $set: {
                vechicletype: req.body.vechicletype,
                registrationnumber: req.body.registrationnumber,
                drivername: req.body.drivername,
                vehiclename: req.body.vehiclename,
                numberofseat: req.body.numberofseat
               } 
            },
            {new: true}
        )
        await updateVehicle.save()
        console.log('NEW',updateVehicle)

        res.status(200).json({ success: true, data: 'Vehicle updated successfully'})
    } catch (error) {
        console.log('UNABLE TO UPDATE VEHICLE', error)
        res.status(500).json({ success: false, data: 'Unable to update vehicle'})
    }
}

export async function deleteVehicle(req, res){
    const { id } = req.params
    console.log('ID', id)
    try {
        const isExist = await VehicleModel.findByIdAndDelete({ _id: id})

        res.status(200).json({ success: true, data: 'Vehicle deleted successfully'})
    } catch (error) {
        console.log('UNABLE TO DELETE VEHICLE', error)
        res.status(500).json({ success: false, data: 'Unable to delete vehicle'})
    }
}

export async function getAll(req, res){
    try {
        const vechicles = await VehicleModel.find()

        res.status(200).json({ success: true, data: vechicles })
    } catch (error) {
        console.log('COULD NOT GET ALL VEHICLE', error)
        res.status(500).json({ success: false, data: 'Unable to get data'})
    }
}

export async function getOne(req, res){
    const { id } = req.params
    try {
        const vechicle = await VehicleModel.findById({ _id:id })
        if(!vechicle){
            return res.status(404).json({ success: false, data: 'Vechicle do not exist'})
        }

        res.status(200).json({ success: true, data: vechicle })
    } catch (error) {
        console.log('COULD NOT GET ALL VEHICLE', error)
        res.status(500).json({ success: false, data: 'Unable to get data'})
    }
}