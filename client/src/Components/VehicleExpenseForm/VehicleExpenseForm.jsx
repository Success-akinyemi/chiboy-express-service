import { useEffect, useState } from 'react'
import './VehicleExpenseForm.css'
import { useFetchVehicle, usefetchVehicleType } from '../../hooks/fetch.hooks'
import { useSelector } from 'react-redux'

function VehicleExpenseForm() {
  const {currentUser} = useSelector(state => state.user)
  const user = currentUser?.data
  const [formData, setFormData] = useState({ preparedby: user?.name })
  const [isLoading, setIsLoading] = useState(false)
  const { isloaidngVehicleCat, vehiclecCatData } = usefetchVehicleType()
  const vehicleCat = vehiclecCatData?.data
  const { isLoadingVehicle, vehicleData } = useFetchVehicle()
  const vehicle = vehicleData?.data

  const [selectedCategory, setSelectedCategory] = useState('');
  const [vehiclesForCategory, setVehiclesForCategory] = useState([]);

    useEffect(() => {
        if(selectedCategory){
            const trimmedSelectedCategory = selectedCategory.trim().toLowerCase();
            console.log('selectedCategory', trimmedSelectedCategory)
            const filterVehicles = vehicle?.filter(vehicle => vehicle?.vechicletype?.trim().toLowerCase() === trimmedSelectedCategory)
            setVehiclesForCategory(filterVehicles)
        } else {
            setVehiclesForCategory([])
        }
    }, [selectedCategory, vehicle])

    const handleChange = (e) => {
      const { id, value } = e.target
      setFormData({ ...formData, [id]: value})
      if(id === 'vechicletype'){
          setSelectedCategory(value)
      }
    }

    const newVehicleExpenseForm = async () => {

    }


    return (
    <form className='vehicleExpenseForm' onSubmit={newVehicleExpenseForm}>
            <div className="top">
                <h1>CHI-BOY Express Services (Departure Form)</h1>
                <span><small>Prepared by: {user?.name}</small></span>
            </div>
            <div className="inputGroup">
                <label htmlFor="">Vehicle Type:</label>
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
                <label htmlFor="">Vehicle ID:</label>
                <div className="opt">
                    <select className='vehicle' onChange={handleChange} id='vechicleid' >
                            <option value=''>Select Vehicle ID</option>
                            {
                                vehiclesForCategory?.map((item, idx) => (
                                    <option key={idx} value={item?.registrationnumber}>{item?.vehiclename} ({item?.registrationnumber})</option>
                                ))
                            }
                    </select>
                </div>
            </div>

            <div className="inputGroup">
                <label htmlFor="">Total Amount:</label>
                <input type="number" required onChange={handleChange} id='totalamount' />
            </div>


            <div className="inputGroup">
                <label htmlFor="">Driver Name:</label>
                <input required type="text" onChange={handleChange} id='drivername' />
            </div>
            <div className="btn">
                <button disabled={isLoading} >{isLoading ? 'Saving...' : 'Save'}</button>
            </div>
    </form>
    )
  }


export default VehicleExpenseForm