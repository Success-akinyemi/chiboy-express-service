import axios from 'axios'
import { useCallback, useEffect, useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_API


//fetch vehicle types/category
export function usefetchVehicleType(query){
    const [data, setData] = useState({isloaidngVehicleCat: true, vehiclecCatData: null, vehiclecvehiclecCatStatus: null, vehiclecCatError: null})

    const fetchVehicleCatData = useCallback(async () => {
        try {
 
            const { data, status } = !query ? await axios.get(`/vehicleCategory/getCategories`, { withCredentials: true }) : await axios.get(`/vehicleCategory/getCategory/${query}`, { withCredentials: true })
            if (status === 200) {
                setData({ isloaidngVehicleCat: false, vehiclecCatData: data, vehiclecCatStatus: status, vehiclecCatError: null })
            } else {
                setData({ isloaidngVehicleCat: false, vehiclecCatData: null, vehiclecCatStatus: status, vehiclecCatError: null })
                console.log('SECOND')
            }
        } catch (error) {
            setData({ isloaidngVehicleCat: false, vehiclecCatData: null, vehiclecCatStatus: null, vehiclecCatError: error })
            console.log(error)
        }
    }, [query]);

    useEffect(() => {
        fetchVehicleCatData();
    }, [fetchVehicleCatData]);

    return data;
}

//fetch Bookings
export function useFetchBooking(query) {
    const [booking, setBooking] = useState({ isLoadingBooking: true, bookingData: null, bookingStatus: null, bookingError: null})

    const fetchBookingData = useCallback(async () => {
        try {
            const { data, status } = !query ? await axios.get(`/booking/getBooking/`, { withCredentials: true }) : await axios.get(`/booking/getBooking/${query}`, { withCredentials: true })

            if (status === 200) {
                setBooking({ isLoadingBooking: false, bookingData: data, bookingStatus: status, bookingError: null })
            } else {
                setBooking({ isLoadingBooking: false, bookingData: null, bookingStatus: status.response, bookingError: null })
                //console.log('CLG', setBooking)
            }
        } catch (error) {
            setBooking({ isLoadingBooking: false, bookingData: null, bookingStatus: error.response.status, bookingError: error.response?.data?.data ? error.response?.data?.data : error })
            console.log('CLG2', error)
        }
    }, [query]);

    useEffect(() => {
        fetchBookingData();
    }, [fetchBookingData]);

    return booking;
}

//fetch Vehicles
export function useFetchVehicle(query) {
    const [vehicle, setVehicle] = useState({ isLoadingVehicle: true, vehicleData: null, vehicleStatus: null, vehicleError: null})

    const fetchVehicleData = useCallback(async () => {
        try {
            const { data, status } = !query ? await axios.get(`/vehicle/getAll`, { withCredentials: true }) : await axios.get(`/vehicle/getOne/${query}`, { withCredentials: true })

            if (status === 200) {
                setVehicle({ isLoadingVehicle: false, vehicleData: data, vehicleStatus: status, vehicleError: null })
            } else {
                setVehicle({ isLoadingVehicle: false, vehicleData: null, vehicleStatus: status.response, vehicleError: null })
                console.log('CLG', setVehicle)
            }
        } catch (error) {
            setVehicle({ isLoadingVehicle: false, vehicleData: null, vehicleStatus: error?.response?.status, vehicleError: error.response?.data?.data ? error.response?.data?.data : error })
            console.log('CLG2', error)
        }
    }, [query]);

    useEffect(() => {
        fetchVehicleData();
    }, [fetchVehicleData]);

    return vehicle;
}