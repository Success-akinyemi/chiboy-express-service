import BookingModel from "../models/Booking.js"
//import { generatePdf } from "../utils/generateReceiptPdf.js"
//import pdf from 'html-pdf'
import PDFDocument from 'pdfkit';
import fs from 'fs';

//create new booking
export async function createBooking(req, res){
    const {travelingfrom, travelingto, name, email, phonenumber, numberofseat, vechicletype, amount, fullpayment, balancepayment, departuretdate, departuretime, nextofkin, nextofkinnumber, preparedby} = req.body
    try {
        if(!travelingfrom || !travelingto || !name || !phonenumber || !vechicletype || !amount || !numberofseat || !departuretdate || !departuretime || !nextofkin || !nextofkinnumber || !preparedby){
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
            travelingfrom, travelingto, name, email, phonenumber, numberofseat, vechicletype, amount, fullpayment, balancepayment, departuretdate, departuretime, nextofkin, nextofkinnumber, preparedby, receiptId
        })
        await newBooking.save()

        // Create a new PDF document using pdfkit
        const outputFilePath = `booking-${receiptId}.pdf`; // Define output file path
        const outputFileName = `booking_receipt_${receiptId}.pdf`;

        const doc = new PDFDocument();
        const stream = fs.createWriteStream(outputFilePath);
        doc.pipe(stream);

        // Add content to the PDF
        doc.font('Times-Roman')
            .fontSize(24)
            .text('CHI-BOY Express Services Booking Form', { align: 'center' });

        doc.fontSize(12);
        doc.text(`Receipt: ${receiptId}`, { align: 'right' });

        doc.moveDown();
        doc.text('Customer Information:');
        doc.moveDown();
        doc.text(`Name: ${name}`);
        doc.text(`Email: ${email}`);
        doc.text(`Phone Number: ${phonenumber}`);
        doc.text(`Number of Seats: ${numberofseat}`);
        doc.text(`Departure Date: ${departuretdate}`);
        doc.text(`Departure Time: ${departuretime}`);

        doc.moveDown();
        doc.text('Booking Details:');
        doc.moveDown();
        doc.text(`Traveling From: ${travelingfrom}`);
        doc.text(`Traveling To: ${travelingto}`);
        doc.text(`Vehicle Type: ${vechicletype}`);
        doc.text(`Amount: ${amount}`);
        doc.text(`Full Payment: ${fullpayment}`);
        doc.text(`Balance Payment: ${balancepayment ? balancepayment : 0}`);

        doc.moveDown();
        doc.text('Next of kin Details:');
        doc.moveDown();
        doc.text(`Next of Kin Name: ${nextofkin}`);
        doc.text(`Next of Kin Phone Number: ${nextofkinnumber}`);

        doc.moveDown();
        doc.text('Payment:')
        doc.text(`${fullpayment === 'YES' ? 'PAID' : 'PAID'}`)
        // Finalize the PDF
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
        
                const doc = new PDFDocument();
                const stream = fs.createWriteStream(outputFilePath);
                doc.pipe(stream);
        
                // Add content to the PDF
                doc.font('Times-Roman')
                    .fontSize(24)
                    .text('CHI-BOY Express Services Booking Form', { align: 'center' });
        
                doc.fontSize(12);
                doc.text(`Receipt: ${booking.receiptId}`, { align: 'right' });
        
                doc.moveDown();
                doc.text('Customer Information:');
                doc.moveDown();
                doc.text(`Name: ${booking.name}`);
                doc.text(`Email: ${booking.email}`);
                doc.text(`Phone Number: ${booking.phonenumber}`);
                doc.text(`Number of Seats: ${booking.numberofseat}`);
                doc.text(`Departure Date: ${booking.departuretdate}`);
                doc.text(`Departure Time: ${booking.departuretime}`);
        
                doc.moveDown();
                doc.text('Booking Details:');
                doc.moveDown();
                doc.text(`Traveling From: ${booking.travelingfrom}`);
                doc.text(`Traveling To: ${booking.travelingto}`);
                doc.text(`Vehicle Type: ${booking.vechicletype}`);
                doc.text(`Amount: ${booking.amount}`);
                doc.text(`Full Payment: ${booking.fullpayment}`);
                doc.text(`Balance Payment: ${booking.balancepayment ? booking.balancepayment : 0}`);
        
                doc.moveDown();
                doc.text('Next of kin Details:');
                doc.moveDown();
                doc.text(`Next of Kin Name: ${booking.nextofkin}`);
                doc.text(`Next of Kin Phone Number: ${booking.nextofkinnumber}`);
        
                doc.moveDown();
                doc.text('Payment:')
                doc.text(`${booking.fullpayment === 'YES' ? 'PAID' : 'PAID'}`)
                // Finalize the PDF
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