import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useFetchVehicle, usefetchVehicleType } from '../../hooks/fetch.hooks';
import './Vehicles.css'
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useState } from 'react';
import { deleteVehicle, deleteVehicleCategory } from '../../helper/api';
import BuildIcon from '@mui/icons-material/Build';

function Vehicles({toggleMenu, menuOpen, setSelectedCard, setVehicleCatId, setVehicleId}) {
  const { isloaidngVehicleCat, vehiclecCatData } = usefetchVehicleType()
  const vehicleCat = vehiclecCatData?.data
  const { isLoadingVehicle, vehicleData } = useFetchVehicle()
  const vehicle = vehicleData?.data
  const [ deletingVehicle, setDeletingVehicle ] = useState(false)
  const [ deletingVehicleCat, setDeletingVehicleCat ] = useState(false)

  //console.log('HO',vehicle)

  /**For get the vehicle type */
  // Create a map to store the count of each vehicle type
  const vehicleCountMap = new Map();

  // Iterate over the data array and count each vehicle type
  vehicle?.forEach(vehicle => {
      const vehicleType = vehicle.vechicletype;
      if (vehicleCountMap.has(vehicleType)) {
          vehicleCountMap.set(vehicleType, vehicleCountMap.get(vehicleType) + 1);
      } else {
          vehicleCountMap.set(vehicleType, 1);
      }
  });

  // Extract the counts from the map
  const vehicleTypeCounts = Array.from(vehicleCountMap.entries());

  //console.log(vehicleTypeCounts);

  const handleCat = (id) => {
    setSelectedCard('editVehicleCat')
    setVehicleCatId(id)
  }

  const handleVehicle = (id) => {
    setSelectedCard('editVehicle')
    setVehicleId(id)
  }

  const handleDeleteCat = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this Vehicle Category')
    if(confirm){
      try {
        setDeletingVehicleCat(true)
        const res = await deleteVehicleCategory({id})
      } catch (error) {
        console.log('UNABLE TO DELETE VEHICLE', error)
      } finally {
        setDeletingVehicleCat(false)
      }
    }
  }

  const handleVehicleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this vehicle')

    if(confirm){
      try {
        setDeletingVehicle(true)
        const res = await deleteVehicle({id})
      } catch (error) {
        console.log('UNABLE TO DELETE VEHICLE', error)
      } finally {
        setDeletingVehicle(false)
      }
    }
  }

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
                <div className="addBtn expense" onClick={() => setSelectedCard('vehicleExpenseForm')}>
                  <span><BuildIcon className='icon' /> New Expense</span>
                </div>
              </div>

              <div className="content">

                <div className="cardContent">
                  <h2 className="h-2">Vehicle Types (Category)</h2>
                  <div className="vevicleTypes">
                    {
                      vehicleTypeCounts?.map((item, idx) => (
                        <div className="card" key={idx}>
                          <h3 className="h-3">Vehicle Type:</h3>
                          <span>
                            <p className="h-2">{item[0]}</p>
                          </span>
                          <div className="qty"><p>Number:</p> {item[1]}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className="vehicleCat">
                  <h3 className="h-3">Vehicles Categories</h3>
                  {
                    vehicleCat?.map((item) => (
                    <div className="cat" key={item?._id}>
                      <h4 className="h-4">{item?.category}</h4>
                      <div className='Vicons' style={{display: 'flex', gap: '15px'}} >
                        <div onClick={() => handleCat(item?._id)} className='edit'> <ModeEditOutlineIcon clasName='icon' /> </div>
                        <div onClick={() => handleDeleteCat(item?._id)} className={`delete ${deletingVehicleCat ? 'null' : ''}`}> <DeleteRoundedIcon clasName='icon' /> </div>
                      </div>
                    </div>
                    ))
                  }
                </div>

                <div className="vehicle">
                  <div className="top">
                    <h2 className="h-2">All Vehicles</h2>
                    <span>total: {vehicle?.length}</span>
                  </div>
                  <div className="head">
                    <h4 className="h-4">Reg Number</h4>
                    <h4 className="h-4">Driver</h4>
                    <h4 className="h-4">Vehicle</h4>
                    <h4 className="h-4"></h4>
                    <h4 className="h-4"></h4>
                  </div>

                  <div className="body">
                    {
                      vehicle?.map((item) => (
                      <div className="bodyInfo" key={item?._id}>
                        <p>{item?.registrationnumber}</p>
                        <p>{item?.drivername}</p>
                        <p>{item?.vehiclename}</p>
                        <p onClick={() => handleVehicle(item?._id)} >
                          <div className="edit"><ModeEditOutlineIcon /></div>
                        </p>
                        <p onClick={() => handleVehicleDelete(item?._id)} >
                          <div className={`delete ${deletingVehicle ? 'null' : ''}`}><DeleteRoundedIcon /></div>
                        </p>
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