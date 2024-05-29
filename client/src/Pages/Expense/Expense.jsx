import { useEffect, useState } from "react";
import Aside from "../../Components/Aside/Aside";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Expense.css";
import BuildIcon from "@mui/icons-material/Build";
import { useFetchVehicleExpense } from "../../hooks/fetch.hooks";
import Spinner from "../../Components/Spinner/Spinner";
import { date, expense } from "../../data/date";
import { Link } from "react-router-dom";
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_SERVER_API



function Expense({ menuOpen, toggleMenu, setSelectedCard }) {
  const { expenseData, isLoadingExpense } = useFetchVehicleExpense();
  const data = expenseData?.data;
  //const data = expense
  //console.log(data)

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

  const [dataArray, setDataArray] = useState([]);
  const [searchQuery, setSearchquery] = useState("");

  const [dateInput, setDateInput] = useState(date[date.length - 1].value);
  const [dateText, setDateText] = useState(date[date.length - 1].text);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    if (data) {
      setDataArray(data);
    }
  }, [data]);

  const handleDateChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setDateInput(e.target.value);
    setDateText(date[selectedIndex].text);
    setCurrentPage(1);
  };

  const dateToDays = (dateValue) => {
    switch (dateValue) {
      case "24h":
        return 1;
      case "7d":
        return 7;
      case "15d":
        return 15;
      case "30d":
        return 30;
      case "60d":
        return 60;
      case "6mth":
        return 180;
      default:
        return 0;
    }
  };

  const filteredDataWithDate = dataArray.filter((item) => {
    if (dateInput === "all") {
      return true;
    } else {
      const currentDate = new Date();
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - dateToDays(dateInput));
      return (
        new Date(item.createdAt) >= startDate &&
        new Date(item.createdAt) <= currentDate
      );
    }
  });

  const totalAmount = filteredDataWithDate.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const sortedData = dataArray?.sort(
    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
  );

  const filteredData = sortedData?.filter((item) => {
    const expenseId = item?.expenseid?.toLowerCase();
    const vehicleId = item?.vehicleid?.toLowerCase();
    const query = searchQuery.toLowerCase();

    return expenseId.includes(query) || vehicleId.includes(query);
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination
  const totalItems = filteredData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const totalItemsDate = filteredDataWithDate.length;
  const totalPagesDate = Math.ceil(totalItemsDate / itemsPerPage);
  const startIndexDate = (currentPage - 1) * itemsPerPage;
  const endIndexDate = startIndex + itemsPerPage;
  const currentItemsDate = filteredDataWithDate?.slice(
    startIndexDate,
    endIndexDate
  );

  return (
    <div className="container">
      <div className="menubarContainer">
        <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <div className="mainContainer">
        <div className="expense">
          <h1 className="h-1">Vehicles</h1>
          <div className="btn">
            <div
              className="addBtn expense"
              onClick={() => setSelectedCard("vehicleExpenseForm")}
            >
              <span>
                <BuildIcon className="icon" /> New Expense
              </span>
            </div>
          </div>

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

            <div className="searchBar">
              <input
                placeholder="Enter Expense ID or Vehicle Registration number to serach"
                value={searchQuery}
                onChange={(e) => setSearchquery(e.target.value)}
              />
            </div>
          </div>

          <p className="total">
            {dateInput !== "all"
              ? `Total Amount (${dateText}): NGN${totalAmount.toLocaleString()}`
              : `Total Amount: NGN${totalAmount.toLocaleString()}`}
          </p>

          <div className="body">
            {isLoadingExpense ? (
              <div className="spinner">
                <Spinner />
              </div>
            ) : (
              <>
                {dateInput === "all"
                  ? currentItems?.map((item) => (
                      <div key={item?._id} className="expenseItem">
                        <div className="one">
                          <p className="id">{item?.expenseid}</p>
                          <p className="name">{item?.vehicle}</p>
                        </div>
                        <div className="two">
                          <p className="amount">{item?.amount}</p>
                          <p className="btn">
                            <Link
                              to={`/vehicleExpense/${item?.expenseid}`}
                              className="link"
                            >
                              View
                            </Link>
                          </p>
                        </div>
                      </div>
                    ))
                  : currentItemsDate?.map((item) => (
                      <div key={item?._id} className="expenseItem">
                        <div className="one">
                          <p className="id">{item?.expenseid}</p>
                          <p className="name">{item?.vehicle}</p>
                        </div>
                        <div className="two">
                          <p className="amount">{item?.amount}</p>
                          <p className="btn">
                            <Link
                              to={`/vehicleExpense/${item?.expenseid}`}
                              className="link"
                            >
                              View
                            </Link>
                          </p>
                        </div>
                      </div>
                    ))}
              </>
            )}
          </div>

          <div className="pagination">
            {dateInput === "all" ? (
              <>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPagesDate}`}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPagesDate}
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="asideContainer">
        <Aside toggleMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default Expense;
