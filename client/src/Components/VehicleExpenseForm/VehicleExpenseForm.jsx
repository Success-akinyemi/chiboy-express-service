import { useEffect, useState } from 'react'
import './VehicleExpenseForm.css'
import { useFetchVehicle, usefetchVehicleType } from '../../hooks/fetch.hooks'
import { useSelector } from 'react-redux'
import { createVehicleExpense } from '../../helper/api'
import toast from 'react-hot-toast'

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
        if (selectedCategory) {
            const trimmedSelectedCategory = selectedCategory.trim().toLowerCase();
            const filterVehicles = vehicle?.filter(vehicle => vehicle?.vechicletype?.trim().toLowerCase() === trimmedSelectedCategory)
            setVehiclesForCategory(filterVehicles)
        } else {
            setVehiclesForCategory([])
        }
    }, [selectedCategory, vehicle])
    
    useEffect(() => {
        setFormData({ ...formData, vehicleid: '' });
    }, [selectedCategory]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'vehicletype') {
            setSelectedCategory(value);
            setFormData({ ...formData, vehicletype: value, vehicleid: '' });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const newVehicleExpenseForm = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await createVehicleExpense(formData)
            if(res?.success){
                toast.success(res?.data)
                window.location.reload()
            }
        } catch (error) {
            console.log('UNABLE TO CREATE EXPENSE FORM', error)
        } finally{
            setIsLoading(false)
        }
    }



    return (
    <form className='vehicleExpenseForm' onSubmit={newVehicleExpenseForm}>
            <div className="top">
                <h1>CHI-BOY Express Services (Vehicle Expense Form)</h1>
                <span><small>Prepared by: {user?.name}</small></span>
            </div>
            <div className="inputGroup">
                <label htmlFor="">Vehicle Type:</label>
                <div className="opt">
                    <select className='vehicle' onChange={handleChange} id='vehicletype' >
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
                    <select className='vehicle' onChange={handleChange} id='vehicleid' >
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
                <label htmlFor="">Description:</label>
                <textarea type="text" required onChange={handleChange} id='description'></textarea>
            </div>

            <div className="inputGroup">
                <label htmlFor="">Total Amount:</label>
                <input type="number" required onChange={handleChange} id='amount' />
            </div>

            <div className="btn">
                <button disabled={isLoading} >{isLoading ? 'Saving...' : 'Save'}</button>
            </div>
    </form>
    )
  }


export default VehicleExpenseForm