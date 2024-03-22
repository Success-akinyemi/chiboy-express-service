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

//update profle
export async function updateAccount(formData){
    try {
        const res = await axios.post(`/auth/updateStaff/${formData?.id}`, formData, {withCredentials: true})
        if(res?.data.success){
            return res.data
        }
    } catch (error) {
        console.log('ERR', error)   
        const errorMsg = error?.response.data.data || 'Unable to update Account'
        toast.error(errorMsg)
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

//update vechile
export async function updateVehicle(formData, {vehicleId}){
    try {
        const res = await axios.post(`/vehicle/update/${vehicleId}`, formData, {withCredentials: true})
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

//update vechile
export async function deleteVehicle({id}){
    try {
        const res = await axios.post(`/vehicle/remove/${id}`, {id}, {withCredentials: true})
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
export async function newVehicleCategory({category}){
    try {
        const res = await axios.post('/vehicleCategory/create', {category}, {withCredentials: true})
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

//update vehicle category
export async function updateVehicleCategory({ vehicleCatId, newCategory }){
    try {
        const res = await axios.post(`/vehicleCategory/update/${vehicleCatId}`, {newCategory}, {withCredentials: true} )
        if(res?.data.success){
            toast.success(res.data?.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERR', error)   
        const errorMsg = error?.response.data.data || 'Unable to Update'
        toast.error(errorMsg)
    }
}

//delete vehicle category
export async function deleteVehicleCategory({id}){
    try {
        const res = await axios.post(`/vehicleCategory/delete/${id}`, {id}, {withCredentials: true})
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

//create new departure
export async function createDeparture(formData){
    try {
        const res = await axios.post('/departure/create', formData, {withCredentials: true})
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

//update departure
export async function updateDeparture(formData){
    try {
        const res = await axios.post('/departure/update', formData, {withCredentials: true})
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