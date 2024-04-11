import { useEffect, useState } from 'react'
import { vehicleId, vehicleType } from '../../data/vehicle'
import './EditDepartures.css'
import { useSelector } from 'react-redux'
import { travelLocations } from '../../data/locations'
import { useFetchDeparture } from '../../hooks/fetch.hooks'
import toast from 'react-hot-toast'
import { updateDeparture } from '../../helper/api'
import { formatDistanceToNow } from 'date-fns'

function EditDepartures({departureId}){
    const [isLoading, setIsLoading] = useState(false)
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const [formData, setFormData] = useState({ updatedby: user.name, id: departureId })
    const { departureData, isLoadingDeparture } = useFetchDeparture(departureId)
    const data = departureData?.data
    console.log('DATAS', data)
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    console.log('DATA', formData)

    const handleEditDeparture = async (e) => {
        e.preventDefault()
        if(user?.role.toLocaleLowerCase() !== 'manager' || user?.role.toLocaleLowerCase() !== 'admin'){
            toast.error('NOT ALLOWED')
            return
        }
        const confirm = window.confirm('Are you sure you want to Edit this Departure slip?')

        if(confirm){
            if(formData.fullpayment === 'NO' && formData.balancepayment === ''){
                toast.error('Enter Balance Payment')
                return
            }
            try {
                setIsLoading(true)
                console.log('Data', formData)
                const res = await updateDeparture(formData)
            } catch (error) {
                console.log('ERROR CREATING DEPARTURE FORM', error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    let createdDate = '';
    if (data?.createdAt) {
        const createdAtDate = new Date(data.createdAt);
        if (!isNaN(createdAtDate)) {
            createdDate = formatDistanceToNow(createdAtDate);
        }
    }

    let updateDate = '';
    if (data?.updatedAt) {
        const updateAtDate = new Date(data.updatedAt);
        if (!isNaN(updateAtDate)) {
            updateDate = formatDistanceToNow(updateAtDate);
        }
    }
  return (
    <form className='editDepartures' onSubmit={handleEditDeparture}>
            <div className="top">
                <h1>CHI-BOY Express Services (Departure Form)</h1>
                <span><small>Prepared by: {data?.preparedby}</small></span>
                <span><small>Created: {createdDate}</small></span>
                <span><small>Updated: {updateDate}</small></span>
            </div>
            <div className="inputGroup">
                <label htmlFor="">Vehicle Type:</label>
                <input disabled defaultValue={data?.vechicletype} type="text" onChange={handleChange} id='vechicletype' />
            </div>
            <div className="inputGroup">
                <label htmlFor="">Vehicle ID:</label>
                <input type="text" disabled defaultValue={data?.vechicleid} onChange={handleChange} id='vechicleid' />
            </div>
            <div className="inputGroup">
                <label htmlFor="">Number of Passengers carried:</label>
                <input type="number" defaultValue={data?.numberofpassengers} onChange={handleChange} id='numberofpassengers' />
            </div>
            <div className="inputGroup">
                <label htmlFor="">Total Amount:</label>
                <input type="number" required defaultValue={data?.totalamount} onChange={handleChange} id='totalamount' />
            </div>
            <div className="inputGroup">
            <label htmlFor="">Full Payment?: (Current: {data?.fullpayment})</label>
            <select className='payment' onChange={handleChange} id='fullpayment'>
                <option value="">Full Payment</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
            </select>
            </div>
                    <div className="inputGroup">
                        <label htmlFor="">Balance Payment:</label>
                        <input defaultValue={data?.balancepayment} type="number" required={formData.fullpayment === 'NO'} onChange={handleChange} id='balancepayment' />
                    </div>

            <div className="inputClass">
                <div className="inputGroup">
                    <label htmlFor="">Traveling From</label>
                    <input disabled defaultValue={data?.travelingfrom} type="text" required onChange={handleChange} id='travelingfrom' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="">Traveling To:</label>
                    <input disabled defaultValue={data?.travelingto} type="text" required onChange={handleChange} id='travelingto' />
                </div>
            </div>
            <div className="inputGroup">
                <label htmlFor="">Departure time:</label>
                <input disabled defaultValue={data?.departuretime} type="text" required onChange={handleChange} id='departuretime' />
            </div>
            <div className="inputGroup">
                <label htmlFor="">Driver Name:</label>
                <input disabled defaultValue={data?.drivername} required type="text" onChange={handleChange} id='drivername' />
            </div>
            {
                user?.role.toLocaleLowerCase() === 'manager' || user?.role.toLocaleLowerCase() === 'admin' || user?.isAdmin && (
                    <div className="btn">
                        <button disabled={isLoading || isLoadingDeparture} >{isLoading ? 'Updating...' : 'Update'}</button>
                    </div>
                )
            }
    </form>
  )
}

export default EditDepartures