import { useEffect, useState } from 'react'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { date } from '../../data/date'
import { useFetchBooking, useFetchDeparture } from '../../hooks/fetch.hooks'
import './Finance.css'
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Loading from '../../Components/Loading/Loading'

function Finance({toggleMenu, menuOpen}) {
  const [ dateInput, setDateInput ] = useState(date[0].value)
  const [ dateText, setDateText ] = useState(date[0].text)
  const { bookingData, isLoadingBooking } = useFetchBooking()
  const { departureData, isLoadingDeparture } = useFetchDeparture()

  const [filteredBookingData, setFilteredBookingData] = useState([]);
  const [filteredDepartureData, setFilteredDepartureData] = useState([]);

  const booking = bookingData?.data || []
  const departure = departureData?.data || []

  const handleDateChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setDateInput(e.target.value);
    setDateText(date[selectedIndex].text)
  }

  useEffect(() => {
    filterDataByDateRange(booking, dateInput, setFilteredBookingData);
    filterDataByDateRange(departure, dateInput, setFilteredDepartureData);
  }, [booking, departure, dateInput, setFilteredBookingData, setFilteredDepartureData]);

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

  const totalBookingSum = filteredBookingData?.reduce((acc, currentItem) => {
    const bookingAmount = currentItem?.amount;
    if (typeof bookingAmount === 'number' && !isNaN(bookingAmount)) {
      return acc + bookingAmount;
    } else if (typeof bookingAmount === 'string') {
      const bookingAmountInt = parseInt(bookingAmount);
      if (!isNaN(bookingAmountInt)) {
        return acc + bookingAmountInt;
      }
    }
    return acc;
  }, 0);

    const totalBookingOutstanding = filteredBookingData?.reduce((acc, currentItem) => {
      const balancePayment = currentItem?.balancepayment;
      if (typeof balancePayment === 'number' && !isNaN(balancePayment)) {
        return acc + balancePayment;
      } else if (typeof balancePayment === 'string') {
        const balancePaymentInt = parseInt(balancePayment);
        if (!isNaN(balancePaymentInt)) {
          return acc + balancePaymentInt;
        }
      }
      return acc;
    }, 0);

    const totalDepartureSum = filteredDepartureData?.reduce((acc, currentItem) => {
      const totalAmount = currentItem?.totalamount;
      if (typeof totalAmount === 'number' && !isNaN(totalAmount)) {
        return acc + totalAmount;
      } else if (typeof totalAmount === 'string') {
        const totalAmountInt = parseInt(totalAmount);
        if (!isNaN(totalAmountInt)) {
          return acc + totalAmountInt;
        }
      }
      return acc;
    }, 0);
  
    const totalDepartureOutstanding = filteredDepartureData?.reduce((acc, currentItem) => {
      const balancePayment = currentItem?.balancepayment;
      if (typeof balancePayment === 'number' && !isNaN(balancePayment)) {
        return acc + balancePayment;
      } else if (typeof balancePayment === 'string') {
        const balancePaymentInt = parseInt(balancePayment);
        if (!isNaN(balancePaymentInt)) {
          return acc + balancePaymentInt;
        }
      }
      return acc;
    }, 0);
    
  
  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="finance">
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
                                    <h3 className="h-3">Total Booking amount:</h3>
                                    <h1 className="h-1">NGN {totalBookingSum.toLocaleString()}</h1>
                                    <h3 className="h-3">Total outstanding:</h3>
                                    <h2 className="h-2">NGN {totalBookingOutstanding.toLocaleString()}</h2>
                                  </div>
                                  <div className="right">
                                    <h3 className="h-3">Total Number:</h3>
                                    <h2 className="h-2">{filteredBookingData?.length}</h2>
                                  </div>
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
                                  <h3 className="h-3">Total Departure Amount:</h3>
                                  <h1 className="h-1">{ totalDepartureSum.toLocaleString() }</h1>
                                  <h3 className="h-3">Total Outstanding:</h3>
                                  <h2 className="h-2">{ totalDepartureOutstanding.toLocaleString() }</h2>
                                </div>
                                <div className="right">
                                  <h3 className="h-3">Total Number</h3>
                                  <h2 className="h-2">{filteredDepartureData?.length}</h2>
                                </div>
                            </div>
                            <small className='small text-muted' >{dateText}</small>
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

export default Finance