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



function App() {
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ selectedCard, setSelectedCard ] = useState(null)
  const [ vehicleCatId, setVehicleCatId ] = useState('')
  const [ vehicleId, setVehicleId ] = useState('')


  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const renderPopupComponent = () => {
    switch(selectedCard) {
      case 'bookingForm' :
        return (
            <BookingForm />
        );
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

          <Route path='/dashboard' element={<Dashboard menuOpen={menuOpen} toggleMenu={toggleMenu} />} />

          <Route path='/bookings' element={<Booking menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />


          <Route path='/vehicles' element={<Vehicles menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setVehicleCatId={setVehicleCatId} setVehicleId={setVehicleId} />} />


          <Route path='/departures' element={<Departures menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />


          <Route path='/finance' element={<Finance menuOpen={menuOpen} toggleMenu={toggleMenu} />} />

          <Route path='/booking/:id' element={<BookingInfo menuOpen={menuOpen} toggleMenu={toggleMenu} />} />

          <Route path='/profile' element={<Profile menuOpen={menuOpen} toggleMenu={toggleMenu} />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App