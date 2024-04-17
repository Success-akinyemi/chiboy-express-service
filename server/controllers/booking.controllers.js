import BookingModel from "../models/Booking.js"
//import { generatePdf } from "../utils/generateReceiptPdf.js"
//import pdf from 'html-pdf'
import PDFDocument from 'pdfkit';
import fs from 'fs';
import StaffModel from "../models/Staff.js";

//create new booking
export async function createBooking(req, res){
    const {travelingfrom, travelingto, name, email, phonenumber, numberofseat, vechicletype, amount, fullpayment, balancepayment, departuretdate, departuretime, bloodgroup, paymenttype, nextofkin, nextofkinnumber, preparedby} = req.body
    try {
        if(!travelingfrom || !travelingto || !name || !phonenumber || !vechicletype || !amount || !numberofseat || !departuretdate || !departuretime || !bloodgroup || !paymenttype || !nextofkin || !nextofkinnumber || !preparedby){
            return res.status(400).json({ success: false, data: 'Fill all necessary feilds'})
        }
        if(fullpayment === 'NO' && !balancepayment){
            return res.status(400).json({ success: false, data: 'Balance Payment amount is needed for part payment'})
        }
        
        const specialAreas = [
            'Jos (Luxurious Bus)',
            'Jos (Sienna)',
            'Jos (Hiace Bus)',
        ]

        if (specialAreas.includes(travelingfrom) && specialAreas.includes(travelingto)) {
            return res.status(400).json({ success: false, data: 'Departure and Arrivial Point cannot be the same' });
        }

        let receiptId
        let isUnique = false

        while (!isUnique){
            receiptId = generateRandomSixDigitId();
            const existingReceiptId = await BookingModel.findOne({ receiptId: receiptId  })
            if(!existingReceiptId){
                isUnique = true
            }
        }

        const newBooking = new BookingModel({
            travelingfrom, travelingto, name, email, phonenumber, numberofseat, vechicletype, amount, fullpayment, balancepayment, departuretdate, departuretime, bloodgroup, paymenttype, nextofkin, nextofkinnumber, preparedby, receiptId
        })
        await newBooking.save()

        // Create a new PDF document using pdfkit
        const outputFilePath = `booking-${receiptId}.pdf`; // Define output file path
        const outputFileName = `booking_receipt_${receiptId}.pdf`;

        const doc = new PDFDocument({ size: [164, 365], margin: 4 });
        const stream = fs.createWriteStream(outputFilePath);
        doc.pipe(stream);

        // Add content to the PDF
        doc.font('Times-Roman')
            .fontSize(13)
            .text('CHI-BOY EXPRESS SERVICES BOOKING RECEIPT', { align: 'center' });

        doc.font('Times-Roman')
            .fontSize(10) 
            .text(`Receipt Id: ${receiptId}`, { align: 'center' })
            //.text(`Prepared by: ${preparedby}`, { align: 'center' });


        doc.moveDown(0.5);
        doc.font('Times-Roman')
            .fontSize(11)
            .text('Customer Information:', { align: 'left' })
            .text(`Name: ${name}`)
            //.text(`${name}`)
            .text(`Phone Number: ${phonenumber}`)
            //.text(`${phonenumber}`)
            .text(`Seats Number: ${numberofseat}`)
            //.text(`${numberofseat}`)
            .text(`Blood Group ${bloodgroup}`)
            //.text(`${bloodgroup}`)
            .text(`Departure Date: ${departuretdate}`)
            //.text(`${departuretdate}`)
            .text(`Departure Time: ${departuretime}`)
            //.text(`${departuretime}`);

        doc.moveDown(0.5);
        doc.font('Times-Roman')
            .fontSize(11)
            .text('Booking Details:', { align: 'left' })
            //.text(`Traveling From: ${travelingfrom}`)
            //.text(`${travelingfrom}`)
            .text(`Traveling To: ${travelingto}`)
            //.text(`${travelingto}`)
            .text(`Vehicle Type: ${vechicletype}`)
            //.text(`${vechicletype}`)
            .text(`Amount: NGN ${amount.toLocaleString()}`)
            //.text(`NGN ${amount}`)

            doc.moveDown(0.5);
            doc.font('Times-Roman')
                .fontSize(11)
                //.text(`Next Of Kin Name: ${nextofkin}`)
                //.text(`${nextofkin}`)
                .text(`Next of Kin Number: ${nextofkinnumber}`)
                //.text(`${nextofkinnumber}`)

        doc.moveDown(0.5);
        doc.font('Times-Roman')
            .fontSize(11)
            .text('No Refund of Money After Payment', { align: 'center' })
            .text("Luaggages at Owner's Risk", { align: 'center' })
            //.text(`${fullpayment === 'YES' ? 'PAID' : 'PAID'}`);
        
        doc.moveDown(2);
        doc.font('Times-Roman')
            .fontSize(9)
            .text('Built and powered by: success_hub technology 09059309831', { align: 'center' })
       
        doc.end();


        // Wait for the stream to finish writing
        stream.on('finish', () => {
            try {
            // Read the file content synchronously
            const pdfBuffer = fs.readFileSync(outputFilePath);
        
            // Set appropriate headers for PDF
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
        
            // Send the PDF content in the response
            res.send(pdfBuffer);
        
            // Optionally, delete the file after sending
            fs.unlinkSync(outputFilePath);
            console.log('PDF sent to the client successfully');
            } catch (readFileError) {
            console.error('Error reading PDF file:', readFileError);
            res.status(500).json({ success: false, data: 'Could not read the PDF file' });
            }
        });

        //res.status(201).json({ success: true, data: 'New Booking created' })
        //res.status(201).json({ success: true, data: `Booking receipt generated: ${__dirname}/booking-${receiptId}.pdf` });
    } catch (error) {
        console.log('UNABLE TO CREATE BOOKING', error)
        res.status(500).json({ success: false, data: 'unable to create booking' })
    }
}

// Function to generate a random seven-digit number
function generateRandomSixDigitId() {
    return Math.floor(1000000 + Math.random() * 9000000); // Generate a number between 100000 and 999999
}

//get all booking
export async function getBooking(req, res){
    try {
        const bookings = await BookingModel.find()
        console.log('success')
        res.status(200).json({ success: true, data: bookings })
    } catch (error) {
        console.log('FAILD TO GET ALL BOOKINGS', error)
        res.status(500).json({ success: false, data:'Could not get all bookings' })
    }
}

//get specific booking
export async function getABooking(req, res){
    const { id } = req.params
    try {
        const booking = await BookingModel.findById({ _id: id })

        if(!booking){
            res.status(404).json({ success: false, data: 'Not Booking Found'})
        }

        res.status(200).json({ success: true, data:booking})
    } catch (error) {
        console.log('COULD NOT GET THIS BOOKING', error)
        res.status(500).json({ success: false, data: 'Unable to get booking details'})
    }
}

//generate PDF receipt on demand
export async function generateReceipt(req, res){
    const { id } = req.body
    try {
        const booking = await BookingModel.findById({ _id:id })
        if(!booking){
            res.status(404).json({ success: false, data: 'Not Booking Found'})
        }

                // Create a new PDF document using pdfkit
                const outputFilePath = `booking-${booking.receiptId}.pdf`; // Define output file path
                const outputFileName = `booking_receipt_${booking.receiptId}.pdf`;
        
                const doc = new PDFDocument({ size: [164, 365], margin: 4 });
                const stream = fs.createWriteStream(outputFilePath);
                doc.pipe(stream);
        
                // Add content to the PDF
                doc.font('Times-Roman')
                    .fontSize(12)
                    .text('CHI-BOY EXPRESS SERVICES BOOKING RECEIPT', { align: 'center' });
        
                doc.font('Times-Roman')
                    .fontSize(10) 
                    .text(`Receipt: ${booking.receiptId}`, { align: 'center' })
                    //.text(`Prepared by: ${booking.preparedby}`, { align: 'center' });
                
                doc.moveDown(0.7);
                doc.font('Times-Roman')
                    .fontSize(11)
                    .text('Customer Information:', { align: 'left' })
                    .text(`Name: ${booking.name}`)
                    //.text(`${booking.name}`)
                    .text(`Phone Number: ${booking.phonenumber}`)
                    //.text(`${booking.phonenumber}`)
                    .text(`Seat Number: ${booking.numberofseat}`)
                    //.text(`${booking.numberofseat}`)
                    .text(`Departure Date: ${booking.departuretdate}`)
                    //.text(`${booking.departuretdate}`)
                    .text(`Departure Time: ${booking.departuretime}`)
                    //.text(`${booking.departuretime}`);
        
                doc.moveDown(0.7);
                doc.font('Times-Roman')
                    .fontSize(11)
                    .text('Booking Details:', { align: 'left' })
                    //.text(`Traveling From: ${booking.travelingfrom}`)
                    //.text(`${booking.travelingfrom}`)
                    .text(`Traveling To: ${booking.travelingto}`)
                    //.text(`${booking.travelingto}`)
                    .text(`Vehicle Type: ${booking.vechicletype}`)
                    //.text(`${booking.vechicletype}`)
                    .text(`Amount: NGN ${booking.amount.toLocaleString()}`)
                    //.text(`${booking.amount}`);
                
                doc.moveDown(0.5);
                doc.font('Times-Roman')
                    .fontSize(11)
                    //.text(`Next Of Kin Name: ${booking.nextofkin}`)
                    //.text(`${nextofkin}`)
                    .text(`Next of Kin Number: ${booking.nextofkinnumber}`)
                    //.text(`${nextofkinnumber}`)

                doc.moveDown(0.7);
                doc.font('Times-Roman')
                    .fontSize(11)
                    .text('No Refund of Money After Payment', { align: 'center' })
                    .text("Luaggages at Owner's Risk", { align: 'center' })
                    
                doc.moveDown(2);
                doc.font('Times-Roman')
                    .fontSize(9)
                    .text('Built and powered by:', { align: 'center' })
                    .text('success_hub technology 09059309831', { align: 'center' })

                doc.end();
        
        
                // Wait for the stream to finish writing
                stream.on('finish', () => {
                    try {
                    // Read the file content synchronously
                    const pdfBuffer = fs.readFileSync(outputFilePath);
                
                    // Set appropriate headers for PDF
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
                
                    // Send the PDF content in the response
                    res.send(pdfBuffer);
                
                    // Optionally, delete the file after sending
                    fs.unlinkSync(outputFilePath);
                    console.log('PDF sent to the client successfully');
                    } catch (readFileError) {
                    console.error('Error reading PDF file:', readFileError);
                    res.status(500).json({ success: false, data: 'Could not read the PDF file' });
                    }
                });

    } catch (error) {
        console.log('UNABLE TO GET RECEIPT', error)
        res.status(500).json({ success: false, data: 'Unable to get receipt'})
    }
}

//update booking info
export async function updateBooking(req, res){
    try {

        const { amount, ...updateDataInfo} = req.body

        const userId = req.user.id
        if(amount){
            const user = await StaffModel.findById({ _id: userId })
            if(user?.role.toLocaleLowerCase() !== 'manager' || user?.role.toLocaleLowerCase() !== 'admin' || !user?.isAdmin){
                return res.status(403).json({ success: false, data: 'Amount can only be updated by Admin or Manager'})
            }
        }
        const { id, ...updateData } = req.body;
        const updatedBooking = await BookingModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ success: false, data: 'Booking not found' });
        }

        res.status(200).json({ success: true, data: 'Booking Updated success'})
    } catch (error) {
        console.log('UNABLE TO UPDTAE BOOKING', error)
        res.status(500).json({ success: false, data: 'Unable to create booking'})
    }
}