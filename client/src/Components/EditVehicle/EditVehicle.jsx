import { useState } from 'react'
import { useFetchVehicle, usefetchVehicleType } from '../../hooks/fetch.hooks'
import './EditVehicle.css'
import { useSelector } from 'react-redux'
import { updateVehicle } from '../../helper/api'

function EditVehicle({vehicleId}) {
  const [formData, setFormData] = useState({
    preparedby: '',
    vehicleId: ''
  });
  const [isLoading, setIsLoading] = useState(false)
  const {currentUser} = useSelector(state => state.user)
  const user = currentUser?.data
  const { isLoadingVehicle, vehicleData } = useFetchVehicle(vehicleId)
  const data = vehicleData?.data
  const { isloaidngVehicleCat, vehiclecCatData } = usefetchVehicleType()
  const vehicleCat = vehiclecCatData?.data
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value})
  }

  const updateVehicleData = async (e) => {
    e.preventDefault()
    try {
      setFormData(prevFormData => ({
        ...prevFormData,
        preparedby: user?.name,
        vehicleId: vehicleId
      }));
      setIsLoading(true)
      const res = await updateVehicle(formData, {vehicleId})
    } catch (error) {
      console.log('UNABLE TO UPDATE VEHICLE INFO', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='editVehicle'>
        <div className="top">
            <h1>CHI-BOY Express Services Edit Vehicle</h1>
            <div>
              <small><b>ID: {vehicleId}</b></small>
            </div>
        </div>
        <div className="inputGroup">
            <label htmlFor="">Vehicle Type (Category):</label>
            <div className="opt">
              <div className="current">
                <label>Current</label>
                <input type="text" disabled defaultValue={data?.vechicletype} />
                <p>UPDATE:</p>
              </div>
                <select className='vehicle' onChange={handleChange} id='vechicletype' >
                        <option value=''>Select Vehicle Type</option>
                        {
                            vehicleCat?.map((item, idx) => (
                                <option key={idx} value={item?.category}>{item?.category}</option>
                            ))
                        }
                </select>
            </div>
        </div>
        <div className="inputGroup">
            <label htmlFor="">Registration Number:</label>
            <input disabled defaultValue={data?.registrationnumber} type="text" onChange={handleChange} id='registrationnumber' />
        </div>
        <div className="inputClass">
            <div className="inputGroup">
                <label htmlFor="">Vehicle Name:</label>
                <input defaultValue={data?.vehiclename} type="text" onChange={handleChange} id='vehiclename' />
            </div>
            <div className="inputGroup">
                <label htmlFor="">Number of Seat(s):</label>
                <input defaultValue={data?.numberofseat} type="number" onChange={handleChange} id='numberofseat' />
            </div>
        </div>
        <div className="inputGroup">
            <label htmlFor="">Driver Name:</label>
            <input defaultValue={data?.drivername} type="text" onChange={handleChange} id='drivername' />
        </div>
        <div className="btn">
            <button disabled={isLoading} onClick={updateVehicleData}>{isLoading ? 'Updating...' : 'Update'}</button>
        </div>
    </form>
  )
}

export default EditVehicle