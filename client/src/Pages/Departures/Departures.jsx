import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Departures.css'

function Departures({toggleMenu, menuOpen, setSelectedCard}) {
  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="departures">
                <h1 className="h-1">Departures</h1>
                <div className="addBtn" onClick={() => setSelectedCard('departureForm')}>
                <span>New Departure</span>
              </div>
            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default Departures