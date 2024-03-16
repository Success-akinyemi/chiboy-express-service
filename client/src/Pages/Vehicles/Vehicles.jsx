import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useFetchVehicle, usefetchVehicleType } from '../../hooks/fetch.hooks';
import './Vehicles.css'
import AddIcon from '@mui/icons-material/Add';

function Vehicles({toggleMenu, menuOpen, setSelectedCard}) {
  const { isloaidngVehicleCat, vehiclecCatData } = usefetchVehicleType()
  const vehicleCat = vehiclecCatData?.data
  const { isLoadingVehicle, vehicleData } = useFetchVehicle()
  const vehicle = vehicleData?.data
  console.log('HO',vehicle)

  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="vehicles">
              <h1 className="h-1">Vehicles</h1>
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
                  <h2 className="h-2">Vehicle Types (Category)</h2>
                  <div className="vevicleTypes">
                    {
                      vehicleCat?.map((item, idx) => (
                        <div className="card" key={item?._id}>
                          <h3 className="h-3">Vehicle Type:</h3>
                          <span>
                            <p className="h-2">{item.category}</p>
                          </span>
                        </div>
                      ))
                    }
                  </div>
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