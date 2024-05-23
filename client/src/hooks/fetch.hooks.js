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
            }
        } catch (error) {
            setBooking({ isLoadingBooking: false, bookingData: null, bookingStatus: error.response?.status, bookingError: error.response?.data?.data ? error.response?.data?.data : error })
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

//fetch Expenses
export function useFetchVehicleExpense(query) {
    const [vehicleExpense, setVehicleExpense] = useState({ isLoadingExpense: true, expenseData: null, expenseStatus: null, expenseError: null})

    const fetchVehicleData = useCallback(async () => {
        try {
            const { data, status } = !query ? await axios.get(`/vehicle/getAllexpense`, { withCredentials: true }) : await axios.get(`/vehicle/getOneExpense/${query}`, { withCredentials: true })

            if (status === 200) {
                setVehicleExpense({ isLoadingExpense: false, expenseData: data, expenseStatus: status, expenseError: null })
            } else {
                setVehicleExpense({ isLoadingExpense: false, expenseData: null, expenseStatus: status.response, expenseError: null })
                console.log('CLG', setVehicleExpense)
            }
        } catch (error) {
            setVehicleExpense({ isLoadingExpense: false, expenseData: null, expenseStatus: error?.response?.status, expenseError: error.response?.data?.data ? error.response?.data?.data : error })
            console.log('CLG2', error)
        }
    }, [query]);

    useEffect(() => {
        fetchVehicleData();
    }, [fetchVehicleData]);

    return vehicleExpense;
}

export function useFetchVehicleFinance(query) {
    const [vehicleExpense, setVehicleExpense] = useState({ isLoadingExpense: true, expenseData: null, expenseStatus: null, expenseError: null})

    const fetchVehicleData = useCallback(async () => {
        try {
            const { data, status } = !query ? await axios.get(`/vehicle/getVehicleExpense`, { withCredentials: true }) : await axios.get(`/vehicle/getVehicleExpenses/${query}`, { withCredentials: true })

            if (status === 200) {
                setVehicleExpense({ isLoadingExpense: false, expenseData: data, expenseStatus: status, expenseError: null })
            } else {
                setVehicleExpense({ isLoadingExpense: false, expenseData: null, expenseStatus: status.response, expenseError: null })
                console.log('CLG', setVehicleExpense)
            }
        } catch (error) {
            setVehicleExpense({ isLoadingExpense: false, expenseData: null, expenseStatus: error?.response?.status, expenseError: error.response?.data?.data ? error.response?.data?.data : error })
            console.log('CLG2', error)
        }
    }, [query]);

    useEffect(() => {
        fetchVehicleData();
    }, [fetchVehicleData]);

    return vehicleExpense;
}

//fetch Bookings
export function useFetchDeparture(query) {
    const [departure, setDeparture] = useState({ isLoadingDeparture: true, departureData: null, departureStatus: null, departureError: null})

    const fetchDepartureData = useCallback(async () => {
        try {
            const { data, status } = !query ? await axios.get(`/departure/getAll`, { withCredentials: true }) : await axios.get(`/departure/getOne/${query}`, { withCredentials: true })

            if (status === 200) {
                setDeparture({ isLoadingDeparture: false, departureData: data, departureStatus: status, departureError: null })
            } else {
                setDeparture({ isLoadingDeparture: false, departureData: null, departureStatus: status.response, departureError: null })
                console.log('CLG', setBooking)
            }
        } catch (error) {
            setDeparture({ isLoadingDeparture: false, departureData: null, departureStatus: error?.response?.status, departureError: error.response?.data?.data ? error.response?.data?.data : error })
            console.log('CLG2', error)
        }
    }, [query]);

    useEffect(() => {
        fetchDepartureData();
    }, [fetchDepartureData]);

    return departure;
}

export function useFetchVehicleDeparture(query) {
    const [departure, setDeparture] = useState({ isLoadingDeparture: true, departureData: null, departureStatus: null, departureError: null})

    const fetchDepartureData = useCallback(async () => {
        try {
            const { data, status } = !query ? await axios.get(`/departure/getAllVehicle`, { withCredentials: true }) : await axios.get(`/departure/getOneVehicle/${query}`, { withCredentials: true })

            if (status === 200) {
                setDeparture({ isLoadingDeparture: false, departureData: data, departureStatus: status, departureError: null })
            } else {
                setDeparture({ isLoadingDeparture: false, departureData: null, departureStatus: status.response, departureError: null })
                console.log('CLG', setBooking)
            }
        } catch (error) {
            setDeparture({ isLoadingDeparture: false, departureData: null, departureStatus: error?.response?.status, departureError: error.response?.data?.data ? error.response?.data?.data : error })
            console.log('CLG2', error)
        }
    }, [query]);

    useEffect(() => {
        fetchDepartureData();
    }, [fetchDepartureData]);

    return departure;
}

//fetch staffs
//fetch Bookings
export function useFetchStaffs(query) {
    const [staff, setStaff] = useState({ isLoadingStaff: true, staffData: null, staffStatus: null, staffError: null})

    const fetchStaffData = useCallback(async () => {
        try {
            const { data, status } = !query ? await axios.get(`/auth/getAllstaffs/`, { withCredentials: true }) : await axios.get(`/auth/getAStaff/${query}`, { withCredentials: true })

            if (status === 200) {
                setStaff({ isLoadingStaff: false, staffData: data, staffStatus: status, staffError: null })
                //console.log('1', booking)
            } else {
                setStaff({ isLoadingStaff: false, staffData: null, staffStatus: status.response, staffError: null })
                //console.log('CLG', booking)
            }
        } catch (error) {
            setStaff({ isLoadingStaff: false, staffData: null, staffStatus: error.response?.status, staffError: error.response?.data?.data ? error.response?.data?.data : error })
            //console.log('CLG2', booking)
        }
    }, [query]);

    useEffect(() => {
        fetchStaffData();
    }, [fetchStaffData]);

    return staff;
}

//fetch vehicle types/category
export function useSmsBalance(query){
    const [data, setData] = useState({isLoadingSmsBal: true, smsData: null, smsStatus: null, smsError: null})

    const fetchSmsData = useCallback(async () => {
        try {
 
            const { data, status } = !query ? await axios.get(`/sms/getSmsBalance`, { withCredentials: true }) : await axios.get(`/sms/getSmsBalance/${query}`, { withCredentials: true })
            if (status === 200) {
                setData({ isLoadingSmsBal: false, smsData: data, smsStatus: status, smsError: null })
            } else {
                setData({ isLoadingSmsBal: false, smsData: null, smsStatus: status, smsError: null })
                console.log('SECOND')
            }
        } catch (error) {
            setData({ isLoadingSmsBal: false, smsData: null, smsStatus: null, smsError: error })
            console.log(error)
        }
    }, [query]);

    useEffect(() => {
        fetchSmsData();
    }, [fetchSmsData]);

    return data;
}
