import { useEffect, useState } from 'react'
import { vehicleId, vehicleType } from '../../data/vehicle'
import './DepartureForm.css'
import { useSelector } from 'react-redux'
import { travelLocations } from '../../data/locations'
import { useFetchVehicle, usefetchVehicleType } from '../../hooks/fetch.hooks'
import toast from 'react-hot-toast'
import { createDeparture } from '../../helper/api'

function DepartureForm(){
    const [formData, setFormData] = useState({ preparedby: '' })
    const [isLoading, setIsLoading] = useState(false)
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
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

    
    const handleDeparture = async (e) => {
        e.preventDefault()
        const confirm = window.confirm('Are you sure you want to create Departure slip.')
        
        if(confirm){
            setFormData({...formData, preparedby: user?.name})
            console.log('DATA', formData)
            if(!formData.travelingfrom){
                toast.error('Select Departure Point')
                return;
            }
            if(!formData.travelingto){
                toast.error('Select Arivial Point')
                return;
            }
            if(formData.travelingfrom === formData.travelingto){
                toast.error('Departure and Arrival Terminal cannot be the same')
                return;
            }
            if(!formData.vechicletype){
                toast.error('Select Vehicle type')
                return;
            }
            if(!formData.fullpayment){
                toast.error('Confirm if Full payment or not')
                return
            }
            if(formData.fullpayment === 'NO' && !formData.balancepayment){
                toast.error('Balance payment is needed')
                return
            }
            try {
                setIsLoading(true)
                //console.log('Data', formData)
                const res = await createDeparture(formData)
            } catch (error) {
                console.log('ERROR CREATING DEPARTURE FORM', error)
            } finally {
                setIsLoading(false)
            }
        }
    }
  return (
    <form className='departureForm' onSubmit={handleDeparture}>
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
                <label htmlFor="">Number of Passengers carried:</label>
                <input type="number" required onChange={handleChange} id='numberofpassengers' />
            </div>
            <div className="inputGroup">
                <label htmlFor="">Total Amount:</label>
                <input type="number" required onChange={handleChange} id='totalamount' />
            </div>
            <div className="inputGroup">
            <label htmlFor="">Full Payment?:</label>
            <select className='payment' onChange={handleChange} id='fullpayment'>
                <option value="">Full Payment</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
            </select>
            </div>
            {
                formData.fullpayment === 'NO' && (
                    <div className="inputGroup">
                        <label htmlFor="">Balance Payment:</label>
                        <input type="number" required={formData.fullpayment === 'NO'} onChange={handleChange} id='balancepayment' />
                    </div>
                )
            }
            <div className="inputClass">
                <div className="inputGroup">
                    <label htmlFor="">Traveling From</label>
                    <select onChange={handleChange} id='travelingfrom'>
                        <option value=''>Departure Terminal</option>
                        {
                            travelLocations.map((item, idx) => (
                                <option key={idx} value={item.location}>{item.location}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="inputGroup">
                    <label htmlFor="">Traveling To:</label>
                    <select onChange={handleChange} id='travelingto'>
                        <option value=''>Arrival Terminal</option>
                        {
                            travelLocations.map((item, idx) => (
                                <option key={idx} value={item.location}>{item.location}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="inputGroup">
                <label htmlFor="">Departure time:</label>
                <select onChange={handleChange} id='departuretime'>
                    <option value="">Departure time</option>
                    <option value="5:00am (Morning Time)">5:00am (Morning Time)</option>
                    <option value="3:00pm (Evening Time)">3:00pm (Evening Time)</option>
                </select>
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

export default DepartureForm