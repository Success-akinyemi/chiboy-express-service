import { useState } from 'react'
import { useFetchStaffs } from '../../hooks/fetch.hooks'
import './NewStaffForm.css'
import { formatDistanceToNow } from 'date-fns'
import { activeStatus, staffRole } from '../../data/staff'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'

function NewStaffForm({ staffId }) {
    const [ formData, setFormData ] = useState({})
    const { isLoadingStaff, staffData } = useFetchStaffs(staffId)
    console.log('DATA ONE', staffData)
    const data = staffData?.data
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const [ isLoading, setIsLoading ] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    let createdDate = '';
    if (data?.createdAt) {
        const createdAtDate = new Date(data.createdAt);
        if (!isNaN(createdAtDate)) {
            createdDate = formatDistanceToNow(createdAtDate);
        }
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            console.log(formData)
        } catch (error) {
            console.log('Failed to update user', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleNewUser = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            console.log(formData)
        } catch (error) {
            console.log('Failed to update user', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='newStaffForm'>
        {
            staffId ? (
                    isLoadingStaff ? (
                        <div className="spinner">
                            <div>
                                <Spinner />
                            </div>
                        </div>
                    ) : (
                        <form className='formA' onSubmit={handleUpdateUser}>
                            <small className='bold'><b>ID: {data?.staffId}</b></small>
                            <small><b>Role: {data?.role}</b></small>
                            <div className="top">
                                <h1 className="h-1">{data?.name}</h1>
                                <div className="active">
                                    <div className='left'>
                                        <p>Created: {createdDate}</p>
                                    </div>
                                    <div className='right'>
                                        <p>Status: {data?.active ? 'Active' : 'InActive'}</p>
                                        <span className={`${data?.active ? 'activeBox' : 'inActiveBox'}`}></span>
                                    </div>
                                </div>
                            </div>
                                <div className="inputGroup">
                                    <label>Name</label>
                                    <input defaultValue={data?.name} id='name' type="text" onChange={handleChange}/>
                                </div>
        
                                <div className="inputGroup">
                                    <label>Email</label>
                                    <input defaultValue={data?.email} id='email' type="email" onChange={handleChange}/>
                                </div>
        
                                <div className="inputGroup">
                                    <label>Phone Number</label>
                                    <input defaultValue={data?.phoneNumber} id='phoneNumber' type="number" onChange={handleChange} />
                                </div>
        
                                <div className="inputGroup">
                                    <label>Staff Role</label>
                                    <select id='role' onChange={handleChange}>
                                        <option value="">Select Staff Role</option>
                                        {
                                            staffRole.map((item) => (
                                                <option value={item?.text}>{item?.text}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="inputGroup">
                                    <label>Active status</label>
                                    <select id='active' onChange={handleChange}>
                                        <option value="">Select Active Status</option>
                                        {
                                            activeStatus.map((item) => (
                                                <option value={item?.value}>{item?.text}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                
                                {
                                    user?.isAdmin && (
                                        <div className="inputGroup">
                                            <label>Reset Pasword:</label>
                                            <input id='password' type="password" onChange={handleChange} />
                                        </div>
                                    )
                                }
                                <div className="btn">
                                    <button className={`${isLoading ? 'loading' : ''}`}>{isLoading ? 'Updating...' : 'Update'}</button>
                                </div>
                        </form>
                    )
            ) : (
                <div>
                    NO ID
                </div>
            )
        }
    </div>
  )
}

export default NewStaffForm