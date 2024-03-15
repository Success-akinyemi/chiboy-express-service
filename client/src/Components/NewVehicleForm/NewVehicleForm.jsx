import { useState } from 'react'
import './NewVehicleForm.css'
import { useSelector } from 'react-redux'
import { vehicleType } from '../../data/vehicle'
import { useFetchVehicle } from '../../hooks/fetch.hooks'
import toast from 'react-hot-toast'

function NewVehicleForm() {
    const [formData, setFormData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const {isLoadingVehicle, vehicleData} = useFetchVehicle()
    const vehicleCat = vehicleData?.data

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    //console.log('DATA', formData)
    const createVehicle = async (e) => {
        e.preventDefault()
        setFormData({...formData, preparedby: user?.name})
        if(!registrationnumber || !vechicletype || !vehiclename || !drivername || !numberofseat || !preparedby){
            toast.error('All inputs are required')
            return
        }
        try {
            setIsLoading(true)
            console.log('FINA', formData)
        } catch (error) {
            console.log('ERROR CREATING NEW VECHILE', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <form className='newVehicleForm'>
        <div className="top">
            <h1>CHI-BOY Express Services New Vehicles</h1>
            <span>Card: <small></small></span>
        </div>
        <div className="inputGroup">
            <label htmlFor="">Vehicle Type (Category):</label>
            <div className="opt">
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
            <input required type="text" onChange={handleChange} id='registrationnumber' />
        </div>
        <div className="inputClass">
            <div className="inputGroup">
                <label htmlFor="">Vehicle Name:</label>
                <input required type="text" onChange={handleChange} id='vehiclename' />
            </div>
            <div className="inputGroup">
                <label htmlFor="">Number of Seat(s):</label>
                <input required type="number" onChange={handleChange} id='numberofseat' />
            </div>
        </div>
        <div className="inputGroup">
            <label htmlFor="">Driver Name:</label>
            <input required type="text" onChange={handleChange} id='drivername' />
        </div>
        <div className="btn">
            <button disabled={isLoading} onClick={createVehicle}>{isLoading ? 'Saving...' : 'Save'}</button>
        </div>
    </form>
  )
}

export default NewVehicleForm