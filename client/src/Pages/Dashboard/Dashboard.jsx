import { useEffect, useState } from 'react'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { date, dateData } from '../../data/date'
import './Dashboard.css'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { useFetchBooking, useFetchDeparture, useFetchVehicle } from '../../hooks/fetch.hooks'
import Loading from '../../Components/Loading/Loading'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_SERVER_API

function Dashboard({toggleMenu, menuOpen}) {
  const [ dateInput, setDateInput ] = useState(date[0].value)
  const [ dateText, setDateText ] = useState(date[0].text)
  const { bookingData, isLoadingBooking } = useFetchBooking()
  const { departureData, isLoadingDeparture } = useFetchDeparture()
  const { isLoadingVehicle, vehicleData } = useFetchVehicle()

    //Scheduler to run every 2 mintues
useEffect(() => {
  const fetchBookings = async () => {
    try {
      const { data, status } = await axios.get(`/booking/corn-job-Booking`, { withCredentials: true });
    } catch (error) {
      console.error('Error getting all bookings:', error);
    }
  };

  // Schedule the task to run every 2 minutes (120,000 milliseconds)
  const intervalId = setInterval(fetchBookings, 120000);

  // Cleanup the interval on component unmount
  return () => clearInterval(intervalId);
}, []);


  const booking = bookingData?.data || []
  const departure = departureData?.data || []
  const vehicle = vehicleData?.data || []
  //console.log('first', booking, 'second', departure, 'thrid', vehicle)

  //const booking = dateData
  //const departure = dateData
  //const vehicle = dateData
  
  useEffect(() => {
    console.log('CODE', dateInput, 'TEXT', dateText)
  }, [dateInput, dateText])

  const [filteredBookingData, setFilteredBookingData] = useState([]);
  const [filteredDepartureData, setFilteredDepartureData] = useState([]);
  const [filteredVehicleData, setFilteredVehicleData] = useState([]);

  useEffect(() => {
    filterDataByDateRange(booking, dateInput, setFilteredBookingData);
    filterDataByDateRange(departure, dateInput, setFilteredDepartureData);
    filterDataByDateRange(vehicle, dateInput, setFilteredVehicleData);
  }, [booking, departure, vehicle, dateInput]);

  const handleDateChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setDateInput(e.target.value);
    setDateText(date[selectedIndex].text)
  }


 const filterDataByDateRange = (data, selectedDateInput, setData) => {

  let filteredData = [...data];
  if (!data) {
    setData([]); 
    return;
  }
 
  if (selectedDateInput !== 'all') {
    const currentDate = new Date();
    let startDate = new Date(currentDate);
    let endDate = new Date(currentDate);
 
    switch (selectedDateInput) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        endDate.setHours(endDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        endDate.setDate(endDate.getDate() - 1);
        break;
      case '15d':
        startDate.setDate(startDate.getDate() - 15);
        endDate.setDate(endDate.getDate() - 8);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        endDate.setDate(endDate.getDate() - 15);
        break;
      case '60d':
        startDate.setDate(startDate.getDate() - 60);
        endDate.setDate(endDate.getDate() - 31);
        break;
      case '6mth':
        startDate.setMonth(startDate.getMonth() - 6);
        endDate.setMonth(endDate.getMonth() - 12);
        break;
      default:
        break;
    }
 
    // Filter data within the specified range
    const filteredDataInRange = data?.filter(item => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= startDate && itemDate <= endDate;
    });
 
    // Filter data within the previous range
    const filteredDataPreviousRange = data?.filter(item => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= endDate && itemDate <= currentDate;
    });
 
    filteredData = [...filteredDataInRange, ...filteredDataPreviousRange];
    //filteredData = [...filteredDataInRange];


  }
 
  setData(filteredData);
  //console.log('first', filteredData)
 }


  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="dashboard">
                <div className="top">
                  <div className="sort">
                    <label>Sort:</label>
                    <select id="" value={dateInput} onChange={handleDateChange}>
                      {
                        date.map((item, idx) => (
                          <option key={idx} value={item.value}>{item.text}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="cards">

                      <div className="card">
                        {
                          isLoadingBooking ? (
                              <div className="main">
                                <div className="loader">
                                  <Loading width={70} height={70} />
                                </div>
                              </div>
                          ) : (
                            <>
                              <span>
                                <EventSeatIcon className='icon booking' /> 
                                Bookings
                              </span>
                              <div className="content">
                                  <div className="left">
                                    <h3 className="h-3">Total Bookings:</h3>
                                    <h1 className="h-1">{ filteredBookingData?.length}</h1>
                                  </div>
                                  <div className="right"></div>
                              </div>
                              <small className='small text-muted' >{dateText}</small>
                            </>
                          )
                        }
                      </div>

                      <div className="card">
                        {
                          isLoadingDeparture ? (
                            <div className="main">
                              <div className="loader">
                                <Loading width={70} height={70} />
                              </div>
                            </div>
                          ) : (
                            <>
                            <span>
                              <DepartureBoardIcon className='icon departure' />
                              Departures
                            </span>
                            <div className="content">
                                <div className="left">
                                  <h3 className="h-3">Total Departures:</h3>
                                  <h1 className="h-1">{ filteredDepartureData?.length}</h1>
                                </div>
                                <div className="right"></div>
                            </div>
                            <small className='small text-muted' >{dateText}</small>
                            </>
                          )
                        }
                      </div>

                      <div className="card">
                        {
                          isLoadingVehicle ? (
                            <div className="main">
                              <div className="loader">
                                <Loading width={70} height={70} />
                              </div>
                            </div>
                          ) : (
                            <>
                            <span>
                              <AirportShuttleIcon className='icon vehicle' />
                              Vehicle
                            </span>
                            <div className="content">
                                <div className="left">
                                  <h3 className="h-3">Total Vehicle:</h3>
                                  <h1 className="h-1">{ vehicleData?.data?.length }</h1>
                                </div>
                                <div className="right"></div>
                            </div>
                            <small className='small text-muted' >All vehicle</small>
                            </>
                          )
                        }
                      </div>

                  </div>
                </div>


            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default Dashboard