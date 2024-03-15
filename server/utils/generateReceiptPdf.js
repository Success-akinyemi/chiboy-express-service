

export const generatePdf = ({travelingfrom, travelingto, name, email, phonenumber, numberofseat, vechicletype, amount, fullpayment, balancepayment, departuretdate, departuretime, nextofkin, nextofkinnumber, receiptId}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Chi-boy Express Booking Receipt</title>
        <style>
            .receiptContainer{
                max-width: 800px;
                background: #f6f6f9;
                padding: 10px;
                border: 1px solid #333;
                font-family: Georgia, 'Times New Roman', Times, serif;
            }
            .top{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 30px;
            }
    
            .top h1{
                font-size: 25px;
            }
    
            .top span{
                font-weight: 600;
            }
    
            .inputGroup{
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;
            }
    
            .inputClass{
                display: flex;
                align-items: center;
                width: 100%;
                gap: 20px;
            }
    
            .travel{
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: -20px;
            }
    
            .travel .traveldiv{
                display: flex;
                width: 100%;
                gap: 20px;
            }
    
            .travel p{
                margin-top: -25px;
            }
    
            .inputClass .inputGroup {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;
            }
    
            label{
                margin-bottom: 10px;
                font-size: 19px;
            }
    
            input,
            select{
                width: 100%;
                border: none;
                outline: navajowhite;
                border-bottom: 3px solid #111e88;
                transition: all 300ms ease-in;
                padding: 5px;
                font-size: 18px;
            }
    
            .opt{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            }
    
            .vehicle{
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
    
            .payment{
                width: 20%;
            }
    
            hr{
                margin-top: 30px;
                border: 2px solid #7d8da1;
            }
        </style>
    </head>
    <body>
        <div class='receiptContainer'>
            <div class="top">
                <h1>CHI-BOY Express Services Booking Form</h1>
                <span>Receipt: <small>${receiptId}</small></span>
            </div>
            <div class="inputGroup">
                <label for="">Name:</label>
                <input type="text" id='name'  value=${name} />
            </div>
            <div class="inputGroup">
                <label for="">Email:</label>
                <input type="email" id='email' value=${email} />
            </div>
            <div class="inputClass">
                <div class="inputGroup">
                    <label for="">Phone Number:</label>
                    <input required type="number" id='phonenumber' value=${phonenumber} />
                </div>
                <div class="inputGroup">
                    <label for="">Number of Seat(s):</label>
                    <input required type="number" id='numberofseat' value=${numberofseat} />
                </div>
            </div>
            <div class="inputClass travel">
                <div class="traveldiv">
                    <div class="inputGroup">
                        <label for="">Traveling From</label>
                        <input type="text" id="travelingfrom" value=${travelingfrom}>
                    </div>
                    <div class="inputGroup">
                        <label for="">Traveling To:</label>
                        <input type="text" id="travelingto" value=${travelingto}>
                    </div>
                </div>
            </div>
            <div class="inputGroup">
                <label for="">Vehicle Type:</label>
                <div class="opt">
                <input type="text" name="" id="vechicletype" value=${vechicletype} >
                </div>
            </div>
            <div class="inputGroup">
                <label for="">Amount:</label>
                <input type="number" required id='amount' value=${amount} />
            </div>
            <div class="inputGroup">
                <label for="">Full Payment?:</label>
                <input type="text" id="fullpayment" value=${fullpayment} >
            </div>
            <div class="inputGroup">
                <label for="">Balance Payment:</label>
                <input type="number" id='balancepayment' value=${balancepayment} />
            </div>
    
    
            <div class="inputClass">
                <div class="inputGroup">
                    <label for="">Departure time:</label>
                    <input type="text" id="departuretime" value=${departuretime}>
                </div>
                <div class="inputGroup">
                    <label for="">Date:</label>
                    <input type="text" id='departuretdate' value=${departuretdate} />
                </div>
            </div>
    
    
    
            <hr />
    
            <h2>Next of Kin Information</h2>
    
            <div class="inputGroup">
                <label for="">Next of Kin Name:</label>
                <input type="text" required id='nextofkin' value=${nextofkin} />
            </div>
    
            <div class="inputGroup">
                <label for="">Next of Kin Phone Number:</label>
                <input type="number" required id='nextofkinnumber' value=${nextofkinnumber} />
            </div>
        </div>
    </body>
    </html>
    
    `
}