import { useState } from 'react'
import { travelLocations } from '../../data/locations'
import { vehicleType } from '../../data/vehicle'
import './BookingForm.css'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { createBooking } from '../../helper/api'
import { usefetchVehicleType } from '../../hooks/fetch.hooks'
//import { saveAs } from 'file-saver';

function BookingForm() {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const [formData, setFormData] = useState({ preparedby: user?.name })
    const [isLoading, setIsLoading] = useState(false)
    const { isloaidngVehicleCat, vehiclecCatData } = usefetchVehicleType()
    const vehicleCat = vehiclecCatData?.data
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleBooking = async (e) => {
        e.preventDefault()
        if(!formData.travelingfrom){
            toast.error('Select Departure Point')
            return;
        }
        if(!formData.travelingto){
            toast.error('Select Arivial Point')
            return;
        }
        if(!formData.vechicletype){
            toast.error('Select Vehicle type')
            return;
        }
        {/**
        
        if(!formData.fullpayment){
            toast.error('Confirm if Full payment or not')
            return;
        }
        */}
        if(!formData.departuretime){
            toast.error('Select a departure time')
            return;
        }
        if(!formData.departuretdate){
            toast.error('Select a departure date')
            return;
        }
        if(!formData.numberofseat){
            toast.error('Enter Number of seat')
            return;
        }
        if(formData.travelingfrom === formData.travelingto){
            toast.error('Departure and Arrival cannot be the same')
            return
        }
        try {
            setIsLoading(true)
            //console.log('BEFORE',formData)
            const res = await createBooking(formData)
            if(res?.data.success){
                //console.log(res)
            }
        } catch (error) {
            console.log('ERROR CREATING BOOKING', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <form className='bookingForm'>
        <small>Being Prepared By: {user.name}</small>
        <div className="top">
            <h1>CHI-BOY Express Services Booking Form</h1>
            <span>Receipt: <small></small></span>
        </div>
        <div className="inputGroup">
            <label htmlFor="">Name:</label>
            <input required type="text" onChange={handleChange} id='name' />
        </div>
        <div className="inputGroup">
            <label htmlFor="">Email:</label>
            <input type="email" onChange={handleChange} id='email' />
        </div>
        <div className="inputClass">
            <div className="inputGroup">
                <label htmlFor="">Phone Number:</label>
                <input required type="number" onChange={handleChange} id='phonenumber' />
            </div>
            <div className="inputGroup">
                <label htmlFor="">Seat Number(s):</label>
                <input required type="text" onChange={handleChange} id='numberofseat' />
            </div>
        </div>
        <div className="inputClass travel">
            <div className="traveldiv">
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
            <p className='danger errorText'>{formData.travelingfrom === formData.travelingto ? 'Departure and Arrival cannot be the same' : ''}</p>
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
            <label htmlFor="">Amount:</label>
            <input type="number" required onChange={handleChange} id='amount' />
        </div>

        <div className="inputGroup">
            <label htmlFor="">Blood Group:</label>
            <input type="text" required onChange={handleChange} id='bloodgroup' />
        </div>

        <div className="inputClass">
            <div className="inputGroup">
                <label htmlFor="">Departure time:</label>
                <select onChange={handleChange} id='departuretime'>
                    <option value="">Departure time</option>
                    <option value="5:00am (Morning Time - Bus)">5:00am (Morning Time - Bus)</option>
                    <option value="4:30am (Morning Time - Sienna)">5:00am (Morning Time - Sienna)</option>
                    <option value="3:00pm (Evening Time)">3:00pm (Evening Time)</option>
                </select>
            </div>
            <div className="inputGroup">
                <label htmlFor="">Date:</label>
                <input type="date" id='departuretdate' onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
            </div>
        </div>
        <div className="inputClass">
            <div className="inputGroup">
                <label htmlFor="">Payment Type:</label>
                <div className="opt">
                    <select required className='vehicle' onChange={handleChange} id='paymenttype' >
                            <option value=''>Select Payment Type</option>
                            <option value='Cash'>Cash</option>
                            <option value='Card'>Card</option>
                    </select>
                </div>
            </div>
            
            <div className="inputGroup">
                <label htmlFor="">Vehicle Number:</label>
                <select onChange={handleChange} id='vehiclenumber'>
                    <option value="">Departure time</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </div>


        <hr />

        <h2>Next of Kin Information</h2>

        <div className="inputGroup">
            <label htmlFor="">Next of Kin Name:</label>
            <input type="text" required onChange={handleChange} id='nextofkin' />
        </div>

        <div className="inputGroup">
            <label htmlFor="">Next of Kin Phone Number:</label>
            <input type="number" required onChange={handleChange} id='nextofkinnumber' />
        </div>

        <div className="btn">
            <button onClick={handleBooking} disabled={isLoading} >{isLoading ? 'Saving...' : 'Save and Print'}</button>
        </div>
    </form>
  )
}

export default BookingForm