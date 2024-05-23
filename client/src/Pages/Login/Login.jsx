import './Login.css'
import {  useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user.js/userSlice'
import toast from 'react-hot-toast'
import { LoginUser } from '../../helper/api'

function Login() {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.user)
  const [ loading, setLoading ] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value})
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    if(!formData.id || !formData.password){
      toast.error('Fill all Information')
      return;
    }
    try {
      dispatch(signInStart())
      setLoading(true)
      const res = await LoginUser(formData)
      //console.log('SERVER RES>', res)
      if(res?.success){
        dispatch(signInSuccess(res?.data))
        localStorage.setItem('token', res?.token)
        navigate('/dashboard')
      } else{
        dispatch(signInFailure(res))
      }
    } catch (error) {
      console.log('EE',error)
      const errorMsg = 'Something went wrong'
      dispatch(signInFailure(errorMsg))
      console.log('ERROR', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login'>
      <h1>Chi-boy Express Services</h1>
      <form onSubmit={handlesubmit}>
          <input 
            type='text'
            placeholder='Enter Email or phone Number or Staff Id'
            id='id'
            className='inputField'
            onChange={handleChange}
          />
          <input 
            type="password"
            placeholder='Enter Password' 
            id='password'
            onChange={handleChange}
            className='inputField'
          />
          <button className={`${loading ? 'loading' : ''}`} disabled={loading} >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p className='errorText'>{error ? error : ''}</p>
      </form>
    </div>
  )
}

export default Login