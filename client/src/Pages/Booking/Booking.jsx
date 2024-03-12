import './Booking.css'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'

function Booking({toggleMenu, menuOpen, setSelectedCard}) {
  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="booking">
              <h1 className="h-1">Booking</h1>
              <div className="addBtn" onClick={() => setSelectedCard('bookingForm')}>
                <span>New Booking</span>
              </div>

              <div className="content">
                <h3 className="h-3">All Bookings</h3>
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