import { useState } from 'react'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useFetchBooking, useSmsBalance } from '../../hooks/fetch.hooks'
import './Messages.css'
import { eveningTravel, moriningTravel, safeJoureny, thisWeekTravel } from '../../data/message'
import toast from 'react-hot-toast'
import { sendSms } from '../../helper/api'

function Messages({toggleMenu, menuOpen}) {
    const [ sendingSms, setSendingSms ] = useState(false)
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [ message, setMessage ] = useState('')
    const { bookingData, isLoadingBooking, bookingError, bookingStatus } = useFetchBooking()
    const data = bookingData?.data
    const { isLoadingSmsBal, smsData } = useSmsBalance()
    const smsBal = smsData?.data

    const handleMsg = (msg) => {
        setMessage(msg)
    }

    const handleContactSelection = (value) => {
        let numbers = [];
    
        switch (value) {
            case 'all':
                numbers = data.map((booking) => booking.phonenumber);
                break;
            case 'thisweek':
                const today = new Date();
                const nextWeek = new Date(today);
                nextWeek.setDate(nextWeek.getDate() + 7);
    
                numbers = data.filter((booking) => {
                    const departureDate = new Date(booking.departuretdate);
                    return departureDate >= today && departureDate <= nextWeek;
                }).map((booking) => booking.phonenumber);
                break;
            case 'today':
                const todayStr = new Date().toISOString().split('T')[0];
                numbers = data.filter((booking) => booking.departuretdate === todayStr).map((booking) => booking.phonenumber);
                break;
            case 'tomorrow':
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowStr = tomorrow.toISOString().split('T')[0];
                numbers = data.filter((booking) => booking.departuretdate === tomorrowStr).map((booking) => booking.phonenumber);
                break;
            default:
                break;
        }
    
        setPhoneNumbers(numbers);
    };

    const handleSendMsg = async (e) => {
        e.preventDefault()
        if(!message){
            toast.error('Message is empty, please write a message')
            return;
        }
        if(phoneNumbers.length === 0){
            toast.error('Phone number list is empty')
            return;
        }
        try {
            setSendingSms(true)
            const res = await sendSms({message: message, phoneNumbers: phoneNumbers})
            if(res?.success){
                toast.success(res?.data)
                window.location.reload()
            }
        } catch (error) {
            console.log('UNABLE TO DSEND SMS', error)
        } finally {
            setSendingSms(false)
        }
    }
    
  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className='messages'>
                <h1 className="h-1">Messages</h1>
                <div className="selectCard">
                    {
                        !isLoadingBooking ? (
                            <>
                                <h2 className="h-2">Send Message to?</h2>
                                <select onChange={(e) => handleContactSelection(e.target.value)}>
                                    <option value="">-- SELECT CONTACT --</option>
                                    <option value="all">All Contact</option>
                                    <option value="thisweek">Travelling This Week</option>
                                    <option value="today">Travelling Today</option>
                                    <option value="tomorrow">Travelling Tomorrow</option>
                                </select>

                                <div className="balance">
                                    <h3>Balnace:</h3> <p>NGN {smsBal?.toFixed(2)}</p>
                                </div>
                                <div className="accountNumber">
                                    <h3>6639568943</h3> <p>- Moniepoint Microfinance Bank. <br /> Account Name: Audacity Mobile Ltd-suc</p>
                                </div>
                            </>
                        ) : (
                            ''
                        )
                    }

                    <div className="right">
                        <div className='card' onClick={() => handleMsg(safeJoureny.msg)}>Safe Jounery Message</div>
                        <div className='card' onClick={() => handleMsg(moriningTravel.msg)}>Travel Reminder Tomorrow (Morining)</div>
                        <div className='card' onClick={() => handleMsg(eveningTravel.msg)}>Travel Reminder Tomorrow (Evening)</div>
                        <div className='card' onClick={() => handleMsg(thisWeekTravel.msg)}>Travel Reminder This Week</div>
                    </div>
                </div>
                
                <div className="totalContact">
                    <p>Total Phone number: {phoneNumbers?.length}</p>
                </div>
                <form className="inputArea" onSubmit={handleSendMsg}>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Write the message you wish to send here' />
                    <button disabled={sendingSms} className="btn">{sendingSms ? 'Sending' : 'Send'}</button>
                </form>
            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default Messages