import { useState } from 'react'
import { vehicleId, vehicleType } from '../../data/vehicle'
import './DepartureForm.css'
import { useSelector } from 'react-redux'
import { travelLocations } from '../../data/locations'

function DepartureForm(){
    const [formData, setFormData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    console.log('DATA', formData)

    const createDeparture = async (e) => {
        e.preventDefault()
        setFormData({...formData, preparedby: user?.name})
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
        if(!formData.fullpayment){
            toast.error('Confirm if Full payment or not')
        }
        try {
            setIsLoading(true)
            const res = await ''
        } catch (error) {
            console.log('ERROR CREATING DEPARTURE FORM', error)
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <form className='departureForm'>
            <div className="top">
                <h1>CHI-BOY Express Services (Departure Form)</h1>
                <span>Receipt: <small></small></span>
            </div>
            <div className="inputGroup">
                <label htmlFor="">Vehicle Type:</label>
                <div className="opt">
                    <select className='vehicle' onChange={handleChange} id='vechicletype' >
                            <option value=''>Select Vehicle Type</option>
                            {
                                vehicleType.map((item, idx) => (
                                    <option key={idx} value={item.vehicle}>{item.vehicle}</option>
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
                                vehicleId.map((item, idx) => (
                                    <option key={idx} value={item.vehicle}>{item.vehicle}</option>
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
                <option value="">Payment type</option>
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
                <label htmlFor="">Driver Name:</label>
                <input required type="text" onChange={handleChange} id='drivername' />
            </div>
            <div className="btn">
                <button onClick={createDeparture}>Save</button>
            </div>
    </form>
  )
}

export default DepartureForm