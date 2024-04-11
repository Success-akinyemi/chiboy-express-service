import { useEffect, useState } from 'react';
import { useFetchVehicle, useFetchVehicleExpense, usefetchVehicleType } from '../../hooks/fetch.hooks';
import './UpdateVehicleExpense.css'
import { useSelector } from 'react-redux'
import { updateVehicleExpense } from '../../helper/api';
import toast from 'react-hot-toast'

function UpdateVehicleExpense({vehicleExpenseId}) {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const [isLoading, setIsLoading] = useState(false)
    const { expenseData, isLoadingExpense } = useFetchVehicleExpense(vehicleExpenseId);
    const data = expenseData?.data
    const [formData, setFormData] = useState({ updatedby: user?.name, expenseid: vehicleExpenseId, vehicleid: data?.vehicleid })
    //console.log('DTA', data)
    const { isloaidngVehicleCat, vehiclecCatData } = usefetchVehicleType()
    const vehicleCat = vehiclecCatData?.data
    const { isLoadingVehicle, vehicleData } = useFetchVehicle()
    const vehicle = vehicleData?.data
      
    const [selectedCategory, setSelectedCategory] = useState('');
    const [vehiclesForCategory, setVehiclesForCategory] = useState([]);
  
  useEffect(() => {console.log(formData)}, [formData])
  
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


    const updateExpense = async (e) => {
        e.preventDefault()
        if(formData.vehicletype && !formData.vehicleid){
            toast.error('Select vehicle Id')
            return;
        }
        if(!formData.vehicletype){
            const { vehicleid, ...updatedFormData } = formData;
            setFormData(updatedFormData);
        }
        try {
            setIsLoading(true)
            const res = await updateVehicleExpense(formData)
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
    <form onSubmit={updateExpense} className='updateVehicleExpense'>
            <div className="top">
                <h1>CHI-BOY Express Services (Departure Form)</h1>
                <span><small>Prepared by: {user?.name}</small></span>
                <span><small>Created on: {new Date(data?.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</small></span>
            </div>
            <div className="inputGroup">
                <label htmlFor="">Vehicle Type: (<b>Current: {data?.vehicletype}</b>)</label>
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
                <label htmlFor="">Vehicle ID (<b>Current: {data?.vehicle} {data?.vehicleid}</b>)</label>
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
                <textarea defaultValue={data?.description} type="text" required onChange={handleChange} id='description'></textarea>
            </div>

            <div className="inputGroup">
                <label htmlFor="">Total Amount:</label>
                <input defaultValue={data?.amount} type="number" required onChange={handleChange} id='amount' />
            </div>

            <div className="btn">
                <button disabled={isLoading || isLoadingExpense} >{isLoading ? 'Updating...' : 'Update'}</button>
            </div>
    </form>
  )
}

export default UpdateVehicleExpense