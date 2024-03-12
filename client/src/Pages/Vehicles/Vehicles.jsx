import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Vehicles.css'
import AddIcon from '@mui/icons-material/Add';

function Vehicles({toggleMenu, menuOpen, setSelectedCard}) {
  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="vehicles">
              <h1 className="h-1">Booking</h1>
              <div className="btn">
                <div className="addBtn" onClick={() => setSelectedCard('vehicleForm')}>
                  <span><AddIcon className='icon' /> New Vehicle</span>
                </div>
                <div className="addBtn bg" onClick={() => setSelectedCard('vehicleCategory')}>
                  <span><AddIcon className='icon' /> New Category</span>
                </div>
              </div>

              <div className="content">
                <div className="cardContent">
                  <div className="card"></div>
                  <div className="card"></div>
                  <div className="card"></div>
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

export default Vehicles