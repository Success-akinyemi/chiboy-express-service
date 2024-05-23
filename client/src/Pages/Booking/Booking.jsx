import './Booking.css'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useFetchBooking } from '../../hooks/fetch.hooks'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../Components/Spinner/Spinner'
import { useEffect, useState } from 'react'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_SERVER_API

function Booking({toggleMenu, menuOpen, setSelectedCard}){
  const [searchQuery, setSearchquery] = useState('');
  const { bookingData, isLoadingBooking, bookingError, bookingStatus } = useFetchBooking()
  //console.log('BOOKING', bookingData, 'ERROR', bookingError, 'STAT', bookingStatus)

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


  const data = bookingData?.data
  const sortedData = data?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));

  const filteredData = sortedData?.filter(item => item?.receiptId?.includes(searchQuery))
  
  const handleBooking = () => {
    setSelectedCard('bookingForm')
  } 
  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="booking">
              <h1 className="h-1">Booking</h1>
              <div className="addBtn" onClick={handleBooking}>
                <span>New Booking</span>
              </div>

              <div className="content">
                <h3 className="h-3">All Bookings</h3>
                {
                  isLoadingBooking ? (
                    <div className="loader">
                      <Spinner />
                    </div>
                  ) : (
                      <div className="bookingCard">
                        <div className="searchBar">
                          <input placeholder='Enter Receipt ID to serach' value={searchQuery} onChange={(e) => setSearchquery(e.target.value)} />
                        </div>

                        <div className="bookingItems">
                          {
                            filteredData?.map((item) => (
                              <div key={item?._id} className="bookingItem">
                                <div className="one">
                                  <p className="id">{item?.receiptId}</p>
                                  <p className="name">{item?.name}</p>
                                </div>

                                <div className="two">
                                  <p className="departDate"><span className={` ${new Date(item?.departuretdate) > new Date() ? 'future' : 'past'}`}></span> {item?.departuretdate}</p>
                                  <p className="btn"><Link to={`/booking/${item?._id}`} className='link' >View</Link></p>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                  )
                }
              </div>
            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default Booking