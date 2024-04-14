import { useEffect, useState } from 'react'
import { travelLocations } from '../../data/locations'
import './EditBooking.css'
import { useSelector } from 'react-redux'
import { useFetchBooking, usefetchVehicleType } from '../../hooks/fetch.hooks'
import { updateBooking } from '../../helper/api'

function EditBooking({bookingId}) {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const [formData, setFormData] = useState({ updatedby: user?.name, id: bookingId })
    const [isLoading, setIsLoading] = useState(false)
    const { isloaidngVehicleCat, vehiclecCatData } = usefetchVehicleType()
    const vehicleCat = vehiclecCatData?.data
    const { bookingData, isLoadingBooking } = useFetchBooking(bookingId);
    const data = bookingData?.data
    console.log('AAA', data)
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }
    
    useEffect(() => {console.log(formData)}, [formData])
    const handleBookingUpdate = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            console.log(formData)
            const res = await updateBooking(formData)
            if(res?.success){
                window.location.reload()
            }
        } catch (error) {
            console.log('ERROR UPDATING BOOKING FORM', error)            
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <form className='editBooking'>
        <small>Prepared By: {data?.preparedby}</small> <br />
        <small>Date Prepared: {new Date(data?.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</small><br />
        {
            data?.updatedby && (
                <>
                    <small>Updated By: {data?.updatedby}</small> <br />
                    <small>Date Prepared: {new Date(data?.updatedAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</small>
                </>
            )
        }
        <div className="top">
            <h1>CHI-BOY Express Services Booking Form</h1>
            <span>Receipt: <small>{data?.receiptId}</small></span>
        </div>
        <div className="inputGroup">
            <label htmlFor="">Name:</label>
            <input defaultValue={data?.name} type="text" onChange={handleChange} id='name' />
        </div>
        <div className="inputGroup">
            <label htmlFor="">Email:</label>
            <input defaultValue={data?.email} type="email" onChange={handleChange} id='email' />
        </div>
        <div className="inputClass">
            <div className="inputGroup">
                <label htmlFor="">Phone Number:</label>
                <input defaultValue={data?.phonenumber} type="number" onChange={handleChange} id='phonenumber' />
            </div>
            <div className="inputGroup">
                <label htmlFor="">Number of Seat(s):</label>
                <input defaultValue={data?.numberofseat} type="number" onChange={handleChange} id='numberofseat' />
            </div>
        </div>
        <div className="inputClass travel">
            <div className="traveldiv">
                <div className="inputGroup">
                    <label htmlFor="">Traveling From (<b>Current: {data?.travelingfrom}</b>)</label>
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
                    <label htmlFor="">Traveling To: (<b>Current: {data?.travelingto}</b>)</label>
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
            <label htmlFor="">Vehicle Type: (<b>Current: {data?.vechicletype}</b>)</label>
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
            <input type="number" disabled={user?.role.toLocaleLowerCase() !== 'manager' || user?.role.toLocaleLowerCase() !== 'admin' || !user?.isAdmin} defaultValue={data?.amount} onChange={handleChange} id='amount' />
        </div>

        <div className="inputClass">
            <div className="inputGroup">
                <label htmlFor="">Departure time: (<b>Current: {data?.departuretime}</b>)</label>
                <select onChange={handleChange} id='departuretime'>
                    <option value="">Departure time</option>
                    <option value="5:00am (Morning Time)">5:00am (Morning Time)</option>
                    <option value="3:00pm (Evening Time)">3:00pm (Evening Time)</option>
                </select>
            </div>
            <div className="inputGroup">
                <label htmlFor="">Date: (<b>Current; {data?.departuretdate}</b>)</label>
                <input type="date" id='departuretdate' onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
            </div>
        </div>



        <hr />

        <h2>Next of Kin Information</h2>

        <div className="inputGroup">
            <label htmlFor="">Next of Kin Name:</label>
            <input type="text" defaultValue={data?.nextofkin} onChange={handleChange} id='nextofkin' />
        </div>

        <div className="inputGroup">
            <label htmlFor="">Next of Kin Phone Number:</label>
            <input type="number" defaultValue={data?.nextofkinnumber} onChange={handleChange} id='nextofkinnumber' />
        </div>

        <div className="btn">
            <button onClick={handleBookingUpdate} disabled={isLoading || isLoadingBooking} >{isLoading ? 'Updating...' : 'Update'}</button>
        </div>
    </form>
  )
}

export default EditBooking