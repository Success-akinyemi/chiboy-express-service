import Aside from "../../Components/Aside/Aside";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useFetchVehicleExpense } from "../../hooks/fetch.hooks";
import "./VehicleExpense.css";
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from "../../Components/Spinner/Spinner";
import { deleteVehicleExpense } from "../../helper/api";
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

function VehicleExpense({toggleMenu, menuOpen, setSelectedCard, setVehicleExpenseId}) {
    const navigate = useNavigate()
    const loc = useLocation()
    const path = loc.pathname.split('/')[2]
    const { expenseData, isLoadingExpense } = useFetchVehicleExpense(path);
    const data = expenseData?.data
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
   

    const handleUpdate = () => {
        setSelectedCard('vehicleExpense')
        setVehicleExpenseId(path)
    }

    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this expense card')
        if(confirm){
            try {
                const res = await deleteVehicleExpense({path})
                if(res?.success){
                    toast.success(res.data)
                    navigate('/expense')
                }
            } catch (error) {
                console.log('UNABLE TO DELETE EXPENSE', error)
            }
        }
    }

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
                        <div>
                            <Spinner />
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="h-1">Vehicles {data?.vehicle}</h1>
                        <div className="infoCard">
                            <div className="top">
                                <small className="small text-muted">ID: {path}</small>
                                <small className="small text-muted">Date: {new Date(data?.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</small>
                            </div>
                            {
                                data.updatedby && (
                                    <div className="update">
                                        <small className="small text-muted">Updated By; {data?.updatedby}</small> <br />
                                        <small className="small text-muted">Updated on: {new Date(data?.updatedAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</small>
                                    </div>
                                )
                            }
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

                            {
                                user?.role.toLocaleLowerCase() !== 'manager' || user?.role.toLocaleLowerCase() !== 'admin' || !user?.isAdmin && (
                                    <div className="btnCard">
                                        <div onClick={handleUpdate} className="btn">Update</div>
                                        <div onClick={handleDelete} className="btn red">Delete</div>
                                    </div>
                                )
                            }
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
