import { usefetchVehicleType } from '../../hooks/fetch.hooks'
import './EditVehicleCategory.css'

function EditVehicleCategory({vehicleCatId}) {
    const {isloaidngVehicleCat, vehiclecCatData} = usefetchVehicleType(vehicleCatId)
    console.log('first')
  return (
    <div className='editVehicleCategory'>
        <p>{vehicleCatId}</p>
    </div>
  )
}

export default EditVehicleCategory