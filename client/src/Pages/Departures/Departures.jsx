import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Spinner from '../../Components/Spinner/Spinner'
import { useFetchDeparture } from '../../hooks/fetch.hooks'
import './Departures.css'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { formatDistanceToNow } from 'date-fns'

function Departures({toggleMenu, menuOpen, setSelectedCard, setDepartureId}) {
  const { departureData, isLoadingDeparture } = useFetchDeparture()
  //console.log('DATA', departureData?.data)
  const data = departureData?.data
  const sortedData = data?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
  
  const handleEditDeparture = (id) => {
    setSelectedCard('editDepartureForm')
    setDepartureId(id)
  }

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

                <div className="body">
                  <h2 className="h-2">All Departures</h2>
                  {
                    isLoadingDeparture ? (
                      <div className="loader">
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        <div className="head">
                          <h4>ID</h4>
                          <h4>Vechicle type</h4>
                          <h4>Total Amount</h4>
                          <h4>Date</h4>
                          <h4></h4>
                        </div>
                        <div className="body">
                          {
                            sortedData?.map((item) => (
                              <div className="bodyInfo">
                                <p>{item?.receiptId}</p>
                                <p>{item?.vechicletype}</p>
                                <p>{item?.totalamount}</p>
                                <p>{formatDistanceToNow(new Date(item?.createdAt))}</p>
                                <p><div onClick={() => handleEditDeparture(item?._id)} className="edit"><ModeEditOutlineIcon /></div></p>
                              </div>
                            ))
                          }
                        </div>
                      </>
                    )
                  }
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