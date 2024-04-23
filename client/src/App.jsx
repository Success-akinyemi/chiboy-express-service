import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'
import Booking from './Pages/Booking/Booking'
import Vehicles from './Pages/Vehicles/Vehicles'
import Departures from './Pages/Departures/Departures'
import BookingForm from './Components/BookingForm/BookingForm'
import DepartureForm from './Components/DepartureForm/DepartureForm'
import NewVehicleForm from './Components/NewVehicleForm/NewVehicleForm'
import VehicleCategory from './Components/VehicleCategory/VehicleCategory'
import Finance from './Pages/Finance/Finance'
import Login from './Pages/Login/Login'
import BookingInfo from './Pages/BookingInfo/BookingInfo'
import EditVehicleCategory from './Components/EditVehicleCategory/EditVehicleCategory'
import Profile from './Pages/Profile/Profile'
import EditVehicle from './Components/EditVehicle/EditVehicle'
import EditDepartures from './Components/EditDepartures/EditDepartures'
import Staffs from './Pages/Staffs/Staffs'
import NewStaffForm from './Components/NewStaffForm/NewStaffForm'
import { AuthorizeUser } from './auth/ProtectRoute'
import VehicleExpenseForm from './Components/VehicleExpenseForm/VehicleExpenseForm'
import Expense from './Pages/Expense/Expense'
import VehicleExpense from './Pages/VehicleExpense/VehicleExpense'
import UpdateVehicleExpense from './Components/UpdateVehicleExpense/UpdateVehicleExpense'
import EditBooking from './Components/EditBooking/EditBooking'
import VehicleFinance from './Pages/VehicleFinance/VehicleFinance'
import Messages from './Pages/Messages/Messages'



function App() {
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ selectedCard, setSelectedCard ] = useState(null)
  const [ vehicleCatId, setVehicleCatId ] = useState('')
  const [ vehicleId, setVehicleId ] = useState('')
  const [ departureId, setDepartureId ] = useState('')
  const [ staffId, setStaffId ] = useState('')
  const [ vehicleExpenseId, setVehicleExpenseId ] = useState('')
  const [ bookingId, setBookingId ] = useState('')


  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const renderPopupComponent = () => {
    switch(selectedCard) {
      case 'bookingForm' :
        return (
            <BookingForm />
        );
      case 'editBooking':
        return (
          <EditBooking bookingId={bookingId} />
        )
      case 'departureForm':
        return (
          <DepartureForm />
        ) 
      case 'vehicleForm':
        return (
          <NewVehicleForm />
        )
      case 'vehicleCategory':
        return (
          <VehicleCategory />
        )
      case 'editVehicleCat':
        return (
          <EditVehicleCategory vehicleCatId={vehicleCatId} />
        )
      case 'editVehicle':
        return (
          <EditVehicle vehicleId={vehicleId} />
        )
      case 'editDepartureForm':
        return (
          <EditDepartures departureId={departureId} />
        )
      case 'newStaff':
        return (
          <NewStaffForm departureId={departureId} staffId={staffId} />
        )
      case 'vehicleExpenseForm':
        return (
          <VehicleExpenseForm  />
        )
      case 'vehicleExpense':
        return (
          <UpdateVehicleExpense vehicleExpenseId={vehicleExpenseId} />
        )
    }
  }

  /**
   * 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('popup-overlay')) {
        setSelectedCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
   */

  const closePopup = () => {
    setSelectedCard(null);
  };

  return (
    <div className='app' >
      {selectedCard && (
        <>
          <div className='popup-overlay'></div>
          <div className={`popup active`}>
              <span className='popup-close' onClick={closePopup}>
                Close
              </span>
            <div className='popup-content'>
                {renderPopupComponent()}
            </div>
          </div>
        </>
      )}
      <Toaster position='top-center'></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />


          <Route element={<AuthorizeUser />}>
            <Route path='/dashboard' element={<Dashboard menuOpen={menuOpen} toggleMenu={toggleMenu} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/bookings' element={<Booking menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/vehicles' element={<Vehicles menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setVehicleCatId={setVehicleCatId} setVehicleId={setVehicleId} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/expense' element={<Expense menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard}  />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/vehicleExpense/:id' element={<VehicleExpense menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setVehicleExpenseId={setVehicleExpenseId} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/departures' element={<Departures menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setDepartureId={setDepartureId} />} />
          </Route>

          
          <Route element={<AuthorizeUser />}>
            <Route path='/messages' element={<Messages menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>
          

          <Route element={<AuthorizeUser />}>
            <Route path='/finance' element={<Finance menuOpen={menuOpen} toggleMenu={toggleMenu} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/booking/:id' element={<BookingInfo menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setBookingId={setBookingId} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/vehicleFinance/:id/:vId' element={<VehicleFinance menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard}  />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/profile' element={<Profile menuOpen={menuOpen} toggleMenu={toggleMenu} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/staffs' element={<Staffs menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setStaffId={setStaffId} />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App