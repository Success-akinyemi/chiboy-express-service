import './Aside.css'
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { recentUpdates } from '../../data/recentUpdates';
import { formatDistanceToNow } from 'date-fns';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'; 

function Aside({toggleMenu}) {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data

    const data = recentUpdates
    const sortedStoreData = data.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
    const latestStoreData = sortedStoreData.slice(0, 3);

  return (
    <div className='aside'>
        <div className="a-top">
            <div className="menu" onClick={toggleMenu}>
                <MenuIcon className='menuIcon' />
            </div>
            <div className="a-profile">
                <div className="info">
                    <p>Hey, <b className="bold">{user?.name}</b></p>
                    <small className="small text-muted">{user?.role} | ID: {user?.staffId}</small>
                </div>
                <div className="admin-profile">
                    <img className='adminImg' src={user?.profileImage} alt='profile' />
                </div>
            </div>
        </div>

        <div className="recentUpdates">
            <h2 className="h-2"> </h2>
            <div className="updates">

            </div>
        </div>

        <div className="sales-analytics">
            <h2 className="h-2"> </h2>
            <div className="item online">
                <div className="icon">
                    <span className="cartIcon"> </span>
                </div>
                <div className="right">
                    <div className="info">
                        <h3 className="h-3"> </h3>
                        <small className="small text-muted">  </small>
                    </div>
                    <h5 className="h-5 success">{/**+39%*/}</h5>
                    <h3 className="h3"> </h3>
                </div>
            </div>

            <div className="item offline">
                <div className="icon">
                    <span className="cartIcon"> </span>
                </div>
                <div className="right">
                    <div className="info">
                        <h3 className="h-3">{/**DELIVERED ORDERS*/}</h3>
                        <small className="small text-muted">{/**Last 24 Hours*/}</small>
                    </div>
                    <h5 className="h-5 success"></h5>
                    <h3 className="h3"></h3>
                </div>
            </div>

            <div className="item customers">
                <div className="icon">
                    <span className="cartIcon"> </span>
                </div>
                <div className="right">
                    <div className="info">
                        <h3 className="h-3"></h3>
                        <small className="small text-muted"></small>
                    </div>
                    <h5 className="h-5 success"></h5>
                    <h3 className="h3"></h3>
                </div>
            </div>

            <div className="item add-product">
                <Link to='/bookings' className='div'>
                    <span className="cartIcon"><AddIcon /></span>
                    <h3 className='h-3'>New Booking</h3>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Aside