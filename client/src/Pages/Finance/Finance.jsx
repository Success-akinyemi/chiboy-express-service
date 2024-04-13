import { useEffect, useState } from 'react'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { date } from '../../data/date'
import { useFetchBooking, useFetchDeparture, useFetchVehicle, useFetchVehicleExpense } from '../../hooks/fetch.hooks'
import './Finance.css'
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import BuildIcon from '@mui/icons-material/Build';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Loading from '../../Components/Loading/Loading'
import { generateReport, generateReportPDF } from '../../helper/api'
import Spinner from '../../Components/Spinner/Spinner'
import PrintIcon from '@mui/icons-material/Print';
import { Link } from 'react-router-dom'


function Finance({toggleMenu, menuOpen}) {
  const [ dataType, setDataType ] = useState()
  const [ dateType, setDateType ] = useState()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ financeRecord, setFinanceRecord ] = useState()
  const [ error, setError ] = useState(null)
  const [ errorMsg, setErrorMsg ] = useState(null)
  const [ isDownLoading, setIsDownloading ] = useState(false)

  const [searchQuery, setSearchquery] = useState("");
  const { isLoadingVehicle, vehicleData } = useFetchVehicle()
  const vehicle = vehicleData?.data



  const [ dateInput, setDateInput ] = useState(date[0].value)
  const [ dateText, setDateText ] = useState(date[0].text)
  const { bookingData, isLoadingBooking } = useFetchBooking()
  const { departureData, isLoadingDeparture } = useFetchDeparture()
  const { expenseData, isLoadingExpense } = useFetchVehicleExpense();

  const [filteredBookingData, setFilteredBookingData] = useState([]);
  const [filteredDepartureData, setFilteredDepartureData] = useState([]);
  const [filteredExpenseDate, setFilteredExpenseData] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const booking = bookingData?.data || []
  const departure = departureData?.data || []
  const expense = expenseData?.data || []
  

  const handleDateChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setDateInput(e.target.value);
    setDateText(date[selectedIndex].text)
  }

  useEffect(() => {
    filterDataByDateRange(booking, dateInput, setFilteredBookingData);
    filterDataByDateRange(departure, dateInput, setFilteredDepartureData);
    filterDataByDateRange(expense, dateInput, setFilteredExpenseData);
  }, [booking, departure, expense, dateInput, setFilteredBookingData, setFilteredDepartureData, setFilteredExpenseData]);

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

    const totalExpenseSum = filteredExpenseDate?.reduce((acc, currentItem) => {
      const totalAmount = currentItem?.amount;
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
    
    const handleGenerateReport = async () => {
      if(!dataType){
        setError('Please Select Data type,')
        setTimeout(() => setError(null), 3000)
        return
      }
      if(!dateType){
        setError('Please Select Date type,')
        setTimeout(() => setError(null), 3000)
        return
      }
      try {
        setIsLoading(true)
        //console.log('FETCH DATA', dataType, dateType)
        const res = await generateReport({dataType, dateType}) 
        if(res?.success){
          setFinanceRecord(res?.data)
          //console.log('DATA', financeRecord, 'RAW DATA', res?.data)
        }
      } catch (error) {
        console.log('Failed to fetch report', error)
      } finally {
        setIsLoading(false)
      }
    } 
  
  const handleDownloadReport = async (data) => {
    if(data.dataType === ''){
      setErrorMsg('select data type')
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }
    if(data.dateType === ''){
      setErrorMsg('select data type') 
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }
    const dataInfo = data.dataType
    const date = data.dateType
    try {
      setIsDownloading(true)
      //console.log(dataInfo, date)
      const res = await generateReportPDF({dataInfo, date})
    } catch (error) {
      console.log('Error generating report', error)
    } finally{
      setIsDownloading(false)
    }
  }

  const filteredData = vehicle?.filter((item) => {
    const vehicleId = item?.registrationnumber?.toLowerCase();
    const query = searchQuery.toLowerCase();

    return vehicleId.includes(query);
  });


    // Pagination
    const totalItems = filteredData?.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData?.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

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

                      <div className="card">
                        {
                          isLoadingExpense ? (
                            <div className="main">
                              <div className="loader">
                                <Loading width={70} height={70} />
                              </div>
                            </div>
                          ) : (
                            <>
                            <span>
                              <BuildIcon className='icon departure' />
                              Expenses
                            </span>
                            <div className="content">
                                <div className="left">
                                  <h3 className="h-3">Total Expense Amount:</h3>
                                  <h1 className="h-1">{ totalExpenseSum.toLocaleString() }</h1>
                                  <h3 className="h-3">Total Outstanding:</h3>
                                  <h2 className="h-2">{0}</h2>
                                </div>
                                <div className="right">
                                  <h3 className="h-3">Total Number</h3>
                                  <h2 className="h-2">{filteredExpenseDate?.length}</h2>
                                </div>
                            </div>
                            <small className='small text-muted' >{dateText}</small>
                            </>
                          )
                        }
                      </div>


                  </div>
                </div>


              <span className='line'></span>

              <div className="vehicle">
                <h1 className="h-1">Get Vehicle Report</h1>
                <p>Generate Report for a vehicle</p>

                <div className="searchBar">
                  <input
                    placeholder="Enter Vehicle Registration number to serach"
                    value={searchQuery}
                    onChange={(e) => setSearchquery(e.target.value)}
                  />
                </div>

                <div className="allVehciles">
                  {
                    currentItems?.map((item) => (
                      <div className="vehicleInfo">
                        <div className="left">
                          <p>{item?.registrationnumber}</p>
                          <p>{item?.vehiclename}</p>
                        </div>
                        <p><Link to={`/vehicleFinance/${item?._id}/${item?.registrationnumber}`} className='link'>View Details</Link></p>
                      </div>
                    ))
                  }
                </div>

                <div className="pagination">
                  <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                    className='next'
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                  </button>
                </div>
              </div>

              <span className='line'></span>

              <div className="middle">
                <h1 className="h-1">Generate Report</h1>
                <p>Generate Report for a time range</p>

                <div className="sortCard">
                  <div className="sort">
                          <label>Select Date:</label>
                          <select id="" value={dateType} onChange={(e) => setDateType(e.target.value)}>
                            <option value="">SELERCT DATE</option>
                            {
                              date.map((item, idx) => (
                                <option key={idx} value={item.value}>{item.text}</option>
                              ))
                            }
                          </select>
                  </div>
                </div>

                <div className="sortCard">
                  <div className="sort">
                          <label>Select Type:</label>
                          <select id="" value={dataType} onChange={(e) => setDataType(e.target.value)}>
                            <option value="">Select Type</option>
                            <option value='booking'>Booking</option>
                            <option value='departure'>Departure</option>    
                          </select>
                  </div>
                </div>
                { error && (
                  <p className='danger'>{error}</p>
                )}
                
                <div className="btn">
                  <button disabled={isLoading} className={`${isLoading ? 'active' : ''}`} onClick={handleGenerateReport}>
                    {isLoading ? 'Loading...' : 'Load Data'}
                  </button>
                </div>

                <div className="dataCard">
                  { isLoading ? (
                      <div className="loader">
                        <Spinner />
                      </div>
                    ) : financeRecord ? (
                      <div className="dataContent">
                        <div className="head">
                          <h2 className="h-2">{dataType} report for the past {dateType}</h2>

                          <div className="btn">
                            <button disabled={isDownLoading} className={`${isDownLoading ? 'active' : ''}`} onClick={() => handleDownloadReport({dataType, dateType})}>
                              <PrintIcon className='icon' />
                              {isDownLoading ? 'Downloading' : 'Download and Print'}
                            </button>
                          </div>
                          { errorMsg && (
                            <p className='danger'>{errorMsg}</p>
                          )}
                        </div>
                          
                          <div className="dataInfoCard">
                            {
                                financeRecord?.map((item) => (
                                    dataType === 'booking' ? (
                                      <div className="dataInfo">
                                        <div className='one'>
                                          <p>{item?.receiptId}</p>
                                          <p>{item?.name}</p>
                                        </div>

                                        <div className='two'>
                                          <p className="departDate"><span className={` ${new Date(item?.departuretdate) > new Date() ? 'future' : 'past'}`}></span> {item?.departuretdate}</p>
                                          <p className="btn"><Link to={`/booking/${item?._id}`} className='link' >View</Link></p>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="dataInfo">
                                        <div className='one'>
                                          <p>{item?.receiptId}</p>
                                          <p>{item?.vechicletype}</p>
                                        </div>

                                        <div className='two'>
                                          <p>{item?.numberofpassengers}</p>
                                          <p>NGN {item?.totalamount}</p>
                                        </div>
                                      </div>
                                    )
                                ))
                            }
                          </div>
                      </div>
                    ) : (
                      ''
                    )
                }
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