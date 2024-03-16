import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_API


export async function LoginUser(formData){
    try {
        const res = await axios.post('/auth/login', formData,  { withCredentials: true })
        console.log('RES API', res)
        if(res?.data.success){
            return res.data
        }
    } catch (error) {
        console.log('ERROR LOGGING', error)
        const res = error.response.data.data
        toast.error(res)
    }
}

//create booking
export async function createBooking(formData){
    try {
        const res = await axios.post('/booking/createBooking', formData, { responseType: 'blob', withCredentials: true })
        console.log('first', res)
        if(res?.data){
            // Create a Blob directly from the response data
            const blob = new Blob([res.data], { type: 'application/pdf' });
            window.location.reload()
            // Use window.open to open a new window with the PDF content
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
      } else {
        console.error('PDF data not received from the server');
        // Handle the case where the server did not provide the PDF data
      }
    } catch (error) {
        console.log('ERROR CREATING BOOKING', error)
        const errorMsg = error.response.data.data || `Could Not create receipt. \n fill all fileds \n Depature and Arrival Must not be the same`
        console.log('MSG', errorMsg)
        toast.error(errorMsg)
    }
}

//generate receipt (Download and Pring)
export async function generateReceipt({id}){
    try {
        const res = await axios.post('/booking/getReceipt', {id}, { responseType: 'blob', withCredentials: true })
        console.log('first', res)
        if(res?.data){
            // Create a Blob directly from the response data
            const blob = new Blob([res.data], { type: 'application/pdf' });
            window.location.reload()
            // Use window.open to open a new window with the PDF content
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
      } else {
        console.error('PDF data not received from the server');
        // Handle the case where the server did not provide the PDF data
      }
    } catch (error) {
        console.log('ERROR CREATING BOOKING', error)
        const errorMsg = error.response.data.data || `Could Not create receipt.`
        console.log('MSG', errorMsg)
        toast.error(errorMsg)
    }
}

//create new vechile
export async function newVehicle(formData){
    try {
        const res = await axios.post('/vehicle/create', formData, {withCredentials: true})
        if(res?.data.success){
            toast.success(res?.data.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERR', error)   
        const errorMsg = error?.response.data.data
        toast.error(errorMsg)
    }
}

//create new vechile category
export async function newVehicleCategory(cat){
    try {
        const res = await axios.post('/vehicle/create', cat, {withCredentials: true})
        if(res?.data.success){
            toast.success(res?.data.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERR', error)   
        const errorMsg = error?.response.data.data
        toast.error(errorMsg)
    }
}