import { useLocation } from "react-router-dom";
import "./BookingInfo.css";
import PrintIcon from "@mui/icons-material/Print";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Aside from "../../Components/Aside/Aside";
import { useFetchBooking } from "../../hooks/fetch.hooks";
import { useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import { generateReceipt } from "../../helper/api";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function BookingInfo({ toggleMenu, menuOpen, setBookingId, setSelectedCard }) {
  const [loading, setLoading] = useState(false);
  const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const { bookingData, isLoadingBooking } = useFetchBooking(path);

  const data = bookingData?.data;

  const handleReceipt = async () => {
    try {
      setLoading(true);
      const id = data?._id;
      const res = await generateReceipt({ id });
    } catch (error) {
      console.log("UNABLE TO CREATE PDF", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setSelectedCard('editBooking')
    setBookingId(path)
  }

  return (
    <div className="container">
      <div className="menubarContainer">
        <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <div className="mainContainer">
        {isLoadingBooking ? (
          <div className="loader">
            <Spinner />
          </div>
        ) : (
          <div className="bookingInfo">
            <h2 className="h-2">Booking Information (Receipt)</h2>
            <div className="actions">
              {
                <button
                  onClick={handleEdit}
                  className="printBtn edit"
                >
                  <ModeEditOutlineIcon className="icon" />
                  Edit
                </button>
              }
              <button
                onClick={handleReceipt}
                disabled={loading}
                className="printBtn"
              >
                <PrintIcon className="icon" />
                {loading ? "Downloading..." : "Download and Print"}
              </button>
            </div>

            <div className="receiptCard">
              <div className="top">
                <h1>CHI-BOY Express Services Booking Form</h1>
                <div className="sub">
                  <span>Prepared By: {data?.preparedby}</span>
                  <span>Receipt: {data?.receiptId}</span>
                </div>
              </div>

              <div className="customerInfo">
                <h2>Customer Information:</h2>
                <span>
                  Name: <p>{data?.name}</p>
                </span>
                <span>
                  Email: <p>{data?.email}</p>
                </span>
                <span>
                  Phone Number <p>{data?.phonenumber}</p>
                </span>
                <div className="minGroup">
                  <span>
                    Seat: Number(S) <p>{data?.numberofseat}</p>
                  </span>
                  <span>
                    Departure Date{" "}
                    <p>
                      {data?.departuretdate}{" "}
                      {new Date(data?.departuretdate) > new Date()
                        ? ""
                        : "(Outdated)"}
                    </p>
                  </span>
                </div>
                <span>
                  Departure Time: <p>{data?.departuretime}</p>
                </span>
                <span>
                  Blood Group: <p>{data?.bloodgroup}</p>
                </span>
              </div>

              <div className="bookingInfo">
                <h2>Booking Details:</h2>
                <div className="minGroup">
                  <span>
                    Traveling From: <p>{data?.travelingfrom}</p>
                  </span>
                  <span>
                    Traveling To: <p>{data?.travelingto}</p>
                  </span>
                </div>
                <span>
                  Vehicle Type: <p>{data?.vechicletype}</p>
                </span>
                <span>
                  Amount: <p>{data?.amount}</p>
                </span>
                <span>
                  Full Payment: <p>{data?.fullpayment}</p>
                </span>
                <span>
                  Balance Payment: <p>{data?.balancepayment}</p>
                </span>
              </div>

              <div className="nextOfKinInfo">
                <h2>Next of kin Details:</h2>
                <span>
                  Next of Kin Name: <p>{data?.nextofkin}</p>
                </span>
                <span>
                  Next of Kin Number: <p>{data?.nextofkinnumber}</p>
                </span>
              </div>

              <div className="paymentStatus">
                <h2>Payment:</h2>
                <span>
                  Payment Status:{" "}
                  {data?.fullpayment === "NO" ? "PART PAYMENT" : "PAID"}
                </span>
                <h2>Payment Method:</h2>
                <span>
                  {data?.paymenttype}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="asideContainer">
        <Aside toggleMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default BookingInfo;
