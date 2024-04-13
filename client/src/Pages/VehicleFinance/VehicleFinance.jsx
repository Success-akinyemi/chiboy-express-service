import { useEffect, useState } from "react";
import Aside from "../../Components/Aside/Aside";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Spinner from "../../Components/Spinner/Spinner";
import {
  useFetchDeparture,
  useFetchVehicle,
  useFetchVehicleDeparture,
  useFetchVehicleFinance,
} from "../../hooks/fetch.hooks";
import "./VehicleFinance.css";
import { useLocation } from "react-router-dom";
import { date } from "../../data/date";
import Loading from "../../Components/Loading/Loading";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import BuildIcon from "@mui/icons-material/Build";
import { formatDistanceToNow } from 'date-fns'

function VehicleFinance({ toggleMenu, menuOpen }) {
  const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const pathId = loc.pathname.split("/")[3];
  const { isLoadingVehicle, vehicleData } = useFetchVehicle(path);
  const vehicle = vehicleData?.data;
  console.log(vehicle);

  const [dateInput, setDateInput] = useState(date[0].value);
  const [dateText, setDateText] = useState(date[0].text);
  const { departureData, isLoadingDeparture } =
    useFetchVehicleDeparture(pathId);
  const { expenseData, isLoadingExpense } = useFetchVehicleFinance(pathId);

  const [filteredDepartureData, setFilteredDepartureData] = useState([]);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);

  const [currentPageE, setCurrentPageE] = useState(1);
  const [currentPageD, setCurrentPageD] = useState(1);
  const itemsPerPage = 10;

  const departure = departureData?.data || [];
  const expense = expenseData?.data || [];

  const handleDateChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setDateInput(e.target.value);
    setDateText(date[selectedIndex].text);
  };

  useEffect(() => {
    filterDataByDateRange(departure, dateInput, setFilteredDepartureData);
    filterDataByDateRange(expense, dateInput, setFilteredExpenseData);
  }, [
    departure,
    expense,
    dateInput,
    setFilteredDepartureData,
    setFilteredExpenseData,
  ]);

  const filterDataByDateRange = (data, selectedDateInput, setData) => {
    let filteredData = [...data];
    if (!data) {
      setData([]);
      return;
    }

    if (selectedDateInput !== "all") {
      const currentDate = new Date();
      let startDate = new Date(currentDate);
      let endDate = new Date(currentDate);

      switch (selectedDateInput) {
        case "24h":
          startDate.setHours(startDate.getHours() - 24);
          endDate.setHours(endDate.getHours() - 24);
          break;
        case "7d":
          startDate.setDate(startDate.getDate() - 7);
          endDate.setDate(endDate.getDate() - 1);
          break;
        case "15d":
          startDate.setDate(startDate.getDate() - 15);
          endDate.setDate(endDate.getDate() - 8);
          break;
        case "30d":
          startDate.setDate(startDate.getDate() - 30);
          endDate.setDate(endDate.getDate() - 15);
          break;
        case "60d":
          startDate.setDate(startDate.getDate() - 60);
          endDate.setDate(endDate.getDate() - 31);
          break;
        case "6mth":
          startDate.setMonth(startDate.getMonth() - 6);
          endDate.setMonth(endDate.getMonth() - 12);
          break;
        default:
          break;
      }

      // Filter data within the specified range
      const filteredDataInRange = data?.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= startDate && itemDate <= endDate;
      });

      // Filter data within the previous range
      const filteredDataPreviousRange = data?.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= endDate && itemDate <= currentDate;
      });

      filteredData = [...filteredDataInRange, ...filteredDataPreviousRange];
      //filteredData = [...filteredDataInRange];
    }

    setData(filteredData);
    //console.log('first', filteredData)
  };

  const totalDepartureSum = filteredDepartureData?.reduce(
    (acc, currentItem) => {
      const totalAmount = currentItem?.totalamount;
      if (typeof totalAmount === "number" && !isNaN(totalAmount)) {
        return acc + totalAmount;
      } else if (typeof totalAmount === "string") {
        const totalAmountInt = parseInt(totalAmount);
        if (!isNaN(totalAmountInt)) {
          return acc + totalAmountInt;
        }
      }
      return acc;
    },
    0
  );

  const totalDepartureOutstanding = filteredDepartureData?.reduce(
    (acc, currentItem) => {
      const balancePayment = currentItem?.balancepayment;
      if (typeof balancePayment === "number" && !isNaN(balancePayment)) {
        return acc + balancePayment;
      } else if (typeof balancePayment === "string") {
        const balancePaymentInt = parseInt(balancePayment);
        if (!isNaN(balancePaymentInt)) {
          return acc + balancePaymentInt;
        }
      }
      return acc;
    },
    0
  );

  const totalExpenseSum = filteredExpenseData?.reduce((acc, currentItem) => {
    const totalAmount = currentItem?.amount;
    if (typeof totalAmount === "number" && !isNaN(totalAmount)) {
      return acc + totalAmount;
    } else if (typeof totalAmount === "string") {
      const totalAmountInt = parseInt(totalAmount);
      if (!isNaN(totalAmountInt)) {
        return acc + totalAmountInt;
      }
    }
    return acc;
  }, 0);

      // Pagination
      const eTotalItems = filteredExpenseData?.length;
      const eTotalPages = Math.ceil(eTotalItems / itemsPerPage);
      const eStartIndex = (currentPageE - 1) * itemsPerPage;
      const eEndIndex = eStartIndex + itemsPerPage;
      const eCurrentItems = filteredExpenseData?.slice(eStartIndex, eEndIndex);
  
      const dTotalItems = filteredDepartureData?.length;
      const dTotalPages = Math.ceil(dTotalItems / itemsPerPage);
      const dStartIndex = (currentPageD - 1) * itemsPerPage;
      const dEndIndex = dStartIndex + itemsPerPage;
      const dCurrentItems = filteredDepartureData?.slice(dStartIndex, dEndIndex);
  
      const handlePageChangeE = (page) => {
        setCurrentPageE(page);
      };
      const handlePageChangeD = (page) => {
        setCurrentPageD(page);
      };

  return (
    <div className="container">
      <div className="menubarContainer">
        <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <div className="mainContainer">
        <div className="vehicleFinance">
          {isLoadingVehicle ? (
            <div className="load">
              <Spinner />
            </div>
          ) : (
            <>
              <h1 className="h-1">vehicle {vehicle?.vehiclename}</h1>
              <h3 className="h-3">
                Registration Number: {vehicle?.registrationnumber}
              </h3>
              <div className="top">
                <div className="sort">
                  <label>Sort:</label>
                  <select id="" value={dateInput} onChange={handleDateChange}>
                    {date.map((item, idx) => (
                      <option key={idx} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cards">
                  <div className="card">
                    {isLoadingDeparture ? (
                      <div className="main">
                        <div className="loader">
                          <Loading width={70} height={70} />
                        </div>
                      </div>
                    ) : (
                      <>
                        <span>
                          <DepartureBoardIcon className="icon departure" />
                          Departures
                        </span>
                        <div className="content">
                          <div className="left">
                            <h3 className="h-3">Total Departure Amount:</h3>
                            <h1 className="h-1">
                              {totalDepartureSum.toLocaleString()}
                            </h1>
                            <h3 className="h-3">Total Outstanding:</h3>
                            <h2 className="h-2">
                              {totalDepartureOutstanding.toLocaleString()}
                            </h2>
                          </div>
                          <div className="right">
                            <h3 className="h-3">Total Number</h3>
                            <h2 className="h-2">
                              {filteredDepartureData?.length}
                            </h2>
                          </div>
                        </div>
                        <small className="small text-muted">{dateText}</small>
                      </>
                    )}
                  </div>

                  <div className="card">
                    {isLoadingExpense ? (
                      <div className="main">
                        <div className="loader">
                          <Loading width={70} height={70} />
                        </div>
                      </div>
                    ) : (
                      <>
                        <span>
                          <BuildIcon className="icon" />
                          Expenses
                        </span>
                        <div className="content">
                          <div className="left">
                            <h3 className="h-3">Total Expense Amount:</h3>
                            <h1 className="h-1">
                              {totalExpenseSum.toLocaleString()}
                            </h1>
                            <h3 className="h-3">Total Outstanding:</h3>
                            <h2 className="h-2">{0}</h2>
                          </div>
                          <div className="right">
                            <h3 className="h-3">Total Number</h3>
                            <h2 className="h-2">
                              {filteredExpenseData?.length}
                            </h2>
                          </div>
                        </div>
                        <small className="small text-muted">{dateText}</small>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {console.log(filteredExpenseData)}
              {console.log(filteredDepartureData)}
              <div className="expenses">
                <h2 className="h-2">Expenses</h2>
                {
                    eCurrentItems.map((item) => (
                        <div key={item?._id} className="expenseItem">
                        <div className="one">
                          <p className="id">{item?.expenseid}</p>
                          <p className="name">{item?.vehicle}</p>
                        </div>
                        <div className="two">
                          <p className="amount">{item?.amount}</p>
                          <p className="btn">
                              View
                          </p>
                        </div>
                      </div>
                    ))
                }
                <div className="pagination">
                  <button
                      onClick={() => handlePageChangeE(currentPageE - 1)}
                      disabled={currentPageE === 1}
                    >
                      Previous
                    </button>
                    <span>{`Page ${currentPageE} of ${eTotalPages}`}</span>
                    <button
                    className='next'
                      onClick={() => handlePageChangeE(currentPageE + 1)}
                      disabled={currentPageE === eTotalPages}
                    >
                      Next
                  </button>
                </div>
              </div>
              <div className="departures">
                <h2 className="h-2">Departures</h2>
                        <div className="head">
                          <h4>ID</h4>
                          <h4>Total Amount</h4>
                          <h4>Date</h4>
                          <h4></h4>
                        </div>
                        <div className="body">
                          {
                            dCurrentItems?.map((item) => (
                              <div key={item?._id} className="bodyInfo">
                                <p>{item?.receiptId}</p>
                                <p>{item?.totalamount}</p>
                                <p>{formatDistanceToNow(new Date(item?.createdAt))} ago</p>
                                <p><div className="edit">View</div></p>
                              </div>
                            ))
                          }
                        </div>
                <div className="pagination">
                  <button
                      onClick={() => handlePageChangeD(currentPageD - 1)}
                      disabled={currentPageD === 1}
                    >
                      Previous
                    </button>
                    <span>{`Page ${currentPageD} of ${dTotalPages}`}</span>
                    <button
                    className='next'
                      onClick={() => handlePageChangeD(currentPageD + 1)}
                      disabled={currentPageD === dTotalPages}
                    >
                      Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="asideContainer">
        <Aside toggleMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default VehicleFinance;
