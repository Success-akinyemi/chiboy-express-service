import './Profile.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Aside from '../../Components/Aside/Aside'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateAccount } from '../../helper/api'
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/user.js/userSlice'

function Profile({toggleMenu, menuOpen}) {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const [ formData, setFormData] = useState({ id: user?._id})
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value })
    }

    const handleUpate = async (e) => {
        e.preventDefault()
        if(formData.oldpassword && !formData.newpassword){
            toast.error('Add a new password')
            return;
        }
        if(formData.newpassword && !formData.oldpassword){
            toast.error('Add a old password')
            return;
        }
        try {
            setIsLoading(true)
            dispatch(updateUserStart())
            const res = await updateAccount(formData)
            if(res?.success){
                toast.success('Account Updated')

                dispatch(updateUserSuccess(res))
            }
        } catch (error) {
            dispatch(updateUserFailure('UNABLE TO UPDATE ACCOUNT'))
            console.log('UNABLE TO UPDATE ACCOUNT', error)
        } finally{
            setIsLoading(false)
        }
    }

  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="profile">
                    <div className="top">
                        <h2 className="h-2">Hi, {user?.name}</h2>
                        <span>Staff Id: {user?.staffId}</span>
                    </div>
                <form className="profileCard">

                    <div className="accountCard">
                        <div className="img">
                            <img src={user?.profileImage} alt='profie'/>
                        </div>

                        <div className="inputCard">
                            <div className="inputGroup">
                                <label htmlFor="">Name:</label>
                                <input  type="text" disabled  defaultValue={user?.name}/>
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="">Email:</label>
                                <input type="email" id='email' defaultValue={user?.email} onChange={handleChange} />
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="">Phone Number:</label>
                                <input type="text" disabled  defaultValue={user?.phoneNumber}/>
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="">Role:</label>
                                <input type="text" disabled  defaultValue={user?.role}/>
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="">Profile Status:</label>
                                <input type="text" disabled  defaultValue={user?.active == true ? 'Active' : 'Inactive'}/>
                            </div>

                            <h4 className="h-4">Update Password</h4>
                            
                            <div className="inputGroup">
                                <label htmlFor="">Old Password:</label>
                                <input id='oldpassword' type='password' onChange={handleChange} />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="">New Password:</label>
                                <input id='newpassword' type='password' onChange={handleChange} />
                            </div>

                        </div>
                    </div>

                    <button className='updateBtn' disabled={isLoading} onClick={handleUpate}>
                        { isLoading ? 'UPdating' : 'Update'}
                    </button>
                </form>

            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default Profile