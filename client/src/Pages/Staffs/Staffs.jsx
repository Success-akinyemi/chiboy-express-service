import { useState } from 'react';
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Spinner from '../../Components/Spinner/Spinner'
import { useFetchStaffs } from '../../hooks/fetch.hooks';
import './Staffs.css'
import { Link } from 'react-router-dom';

function Staffs({toggleMenu, menuOpen, setSelectedCard, setStaffId}) {
    const [searchQuery, setSearchquery] = useState('');
    const { isLoadingStaff, staffData } = useFetchStaffs()
  
  
    const data = staffData?.data
    const sortedData = data?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
    
    const filteredData = sortedData?.filter(item => item?.staffId?.includes(searchQuery))


    const handleNewStaff = (id) => {
        setSelectedCard('newStaff')
        setStaffId(id)
    } 

  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
        <div className="staffs">
              <h1 className="h-1">Staffs</h1>
              <div className="addBtn" onClick={() => handleNewStaff('')}>
                <span>New Staff</span>
              </div>

              <div className="content">
                <h3 className="h-3">All staffs ({data?.length})</h3>
                {
                  isLoadingStaff ? (
                    <div className="loader">
                      <Spinner />
                    </div>
                  ) : (
                      <div className="staffsCard">
                        <div className="searchBar">
                          <input placeholder='Enter Staff ID to serach' value={searchQuery} onChange={(e) => setSearchquery(e.target.value)} />
                        </div>

                        <div className="staffsItems">
                            <p>{filteredData?.length}</p>
                          {
                            filteredData?.map((item) => (
                              <div key={item?._id} className="staffsItem">
                                <div className="one">
                                  <p className="id">{item?.staffId}</p>
                                  <p className="name">{item?.name}</p>
                                </div>

                                <div className="two">
                                  <p className="departDate"><span className={` ${item?.active === true  ? 'future' : 'past'}`}></span> {item?.active === true ? 'Active' : 'Inactive'}</p>
                                  <p className="btn" onClick={() => handleNewStaff(item?._id)}><span className="link">View</span></p>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
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

export default Staffs