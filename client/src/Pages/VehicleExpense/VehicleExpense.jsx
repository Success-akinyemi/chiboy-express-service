import Aside from "../../Components/Aside/Aside";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useFetchVehicleExpense } from "../../hooks/fetch.hooks";
import "./VehicleExpense.css";
import { useLocation } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import Spinner from "../../Components/Spinner/Spinner";

function VehicleExpense({toggleMenu, menuOpen}) {
    const loc = useLocation()
    const path = loc.pathname.split('/')[2]
    const { expenseData, isLoadingExpense } = useFetchVehicleExpense(path);
    const data = expenseData?.data
    console.log('data', expenseData)

  return (
    <div className="container">
      <div className="menubarContainer">
        <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <div className="mainContainer">
        <div className="vehicleExpense">
            {
                isLoadingExpense ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <h1 className="h-1">Vehicles {data?.vehicle}</h1>
                        <div className="infoCard">
                            <div className="top">
                                <small className="small text-muted">ID: {path}</small>
                                <small className="small text-muted">Date: {new Date(data?.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</small>
                            </div>
                            <div className="info">
                                <h4 className="h-4">Vehicle:</h4>
                                <p>{data?.vehicle}</p>
                            </div>
                            <div className="info">
                                <h4 className="h-4">Vehicle type:</h4>
                                <p>{data?.vehicletype}</p>
                            </div>
                            <div className="info">
                                <h4 className="h-4">Expense (Description):</h4>
                                <p>{data?.description}</p>
                            </div>
                            <div className="info">
                                <h4 className="h-4">Amount</h4>
                                <p>NGN {data?.amount}</p>
                            </div>
                            <div className="info">
                                <h4 className="h-4">Prepared By:</h4>
                                <p>{data?.preparedby}</p>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
      </div>

      <div className="asideContainer">
        <Aside toggleMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default VehicleExpense;
