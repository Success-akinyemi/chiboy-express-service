import './Sidebar.css'
import { useDispatch, } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Sidebar({toggleMenu, menuOpen}) {
    const location = useLocation();
    const dispatch = useDispatch()
  
    const isActive = (path) => {
      return location.pathname === path;
    };
  
    const handleSignOut = async () => {
      try {

      } catch (error) {
          console.log(error)
      }
    }

  return (
    <div className={`sidebar ${menuOpen ? 'show' : 'hide'}`}>
        <div className="top">
          <div className="logo">
                <Link className='link'>Chi-Boy Express</Link>
          </div>
          <div className="close" onClick={toggleMenu}>
            <CloseIcon className='closeIcon' />
          </div>
        </div>

        <div className="menuList">
          <Link onClick={toggleMenu} to='/dashboard' className={`link h-2 menuLinks ${isActive('/dashboard') ? 'active' : ''}`}>
            <DashboardIcon className='menuLinks-icon' />
            <Link to='/dashboard' className='link menuLink'>Dashboard</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/bookings' className={`link h-2 menuLinks ${isActive('/bookings') ? 'active' : ''}`}>
            <EventSeatIcon className='menuLinks-icon' />
            <Link to='/bookings' className='link menuLink'>Bookings</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/vehicles' className={`link h-2 menuLinks ${isActive('/vehicles') ? 'active' : ''} `}>
            <AirportShuttleIcon className='menuLinks-icon' />
            <Link to='/vehicles' className='link menuLink'>Vehicles</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/departures' className={`link h-2 menuLinks ${isActive('/departures') ? 'active' : ''} `}>
            <DepartureBoardIcon className='menuLinks-icon' />
            <Link to='/departures' className='link menuLink'>Departures</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/finance' className={`link h-2 menuLinks ${isActive('/finance') ? 'active' : ''} `}>
            <PaidIcon className='menuLinks-icon' />
            <Link to='/finance' className='link menuLink'>Finance</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/profile' className={`link h-2 menuLinks ${isActive('/profile') ? 'active' : ''} `}>
            <AccountCircleRoundedIcon className='menuLinks-icon' />
            <Link to='/profile' className='link menuLink'>Profile</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/staffs' className={`link h-2 menuLinks ${isActive('/staffs') ? 'active' : ''} `}>
            <PeopleAltIcon className='menuLinks-icon' />
            <Link to='/staffs' className='link menuLink'>Staffs</Link>
          </Link>

        </div>

        <div className="bottom">
          <span onClick={handleSignOut} className='h-2'><LogoutIcon className='logoutIcon' /> Logout</span>
        </div>
    </div>
  )
}

export default Sidebar