import BookingModel from "../models/Booking.js"
import Departuremodel from "../models/Departures.js"
import PDFDocument from 'pdfkit';
import fs from 'fs';
import moment from 'moment';

export async function generateReport(req, res){
    const { dataType, dateType } = req.body
    try {
        if(!dataType || !dateType){
            res.status(404).json({ success: false, data: 'All inputs are required'})
        }

        let model
        if(dataType === 'booking'){
            model = BookingModel 
        } else if(dataType === 'departure'){
            model = Departuremodel
        } else {
            res.status(400).json({ success: false, data: 'Invalid data type'})
        }

        let startDate
        let endDate = new Date()

        switch(dateType) {
            case '7d':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                break;
            case '15d':
                startDate = new Date()
                startDate.setDate(startDate.getDate() - 15);
                break
            case '30d':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);
                break
            case '60d':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 60);
                break
            case '6mth':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 6)
                break
            case 'all':
                startDate = null;
                break
            default:
                return res.status(400).json({ success: false, data: 'Invalid date type' })
        }

        let data;
        if(startDate){
            data = await model.find({ createdAt: { $gte: startDate, $lte: endDate } })
        } else {
            data = await model.find({ createdAt: { $lte: endDate }})
        }

        //console.log('DATA', data)
        res.status(200).json({ success: true, data})
    } catch (error) {
        console.log('FAILED TO GENERATE REPORT', error)
        res.status(500).json({ success: false, data: 'Failed to generated Report' })
    }
}

export async function getReportPDF(req, res) {
    const { dataInfo, date } = req.body;
    const dataType = dataInfo;
    const dateType = date;

    try {
        if (!dataType || !dateType) {
            return res.status(400).json({ success: false, data: 'All inputs are required' });
        }

        let model;
        if (dataType === 'booking') {
            model = BookingModel;
        } else if (dataType === 'departure') {
            model = Departuremodel;
        } else {
            return res.status(400).json({ success: false, data: 'Invalid data type' });
        }

        let startDate;
        let endDate = new Date();

        switch (dateType) {
            case '7d':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                break;
            case '15d':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 15);
                break;
            case '30d':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);
                break;
            case '60d':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 60);
                break;
            case '6mth':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 6);
                break;
            case 'all':
                startDate = null;
                break;
            default:
                return res.status(400).json({ success: false, data: 'Invalid date type' });
        }

        let data;
        if (startDate) {
            data = await model.find({ createdAt: { $gte: startDate, $lte: endDate } });
        } else {
            data = await model.find({ createdAt: { $lte: endDate } });
        }

        // Generate PDF
        const pdfBuffer = await generatePDF(data);

        // Send the PDF buffer as response
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="report.pdf"',
        });
        res.status(200).send(pdfBuffer);
    } catch (error) {
        console.log('Failed to get report', error);
        res.status(500).json({ success: false, data: 'Failed to get report' });
    }
}

export function generatePDF(data) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4' }); 
        const buffers = [];

        // Buffer the PDF data
        doc.on('data', buffers.push.bind(buffers));

        
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        // Adding PDF content
        doc.font('Times-Roman')
           .fontSize(24)
           .text('CHI-BOY Express Services Finance Sheet', { align: 'center' });

        doc.fontSize(14)
           .text(`Printed: ${moment().format('DD MMMM YYYY HH:mm')}`, { align: 'right' }); // Format date using moment.js
        doc.moveDown();

        doc.font('Helvetica-Bold').text('ID', 50, 150);
        doc.text('Name', 150, 150);
        doc.text('Amount', 300, 150);
        doc.text('Full Payment', 450, 150);
        doc.text('Balance', 600, 150);
        doc.text('Date', 600, 150);


        // Adding table rows
        let y = 180;
        for (const item of data) {
            doc.font('Helvetica').text(item.receiptId, 50, y);
            doc.text(item.name, 150, y);
            doc.text(`${item.amount}`, 300, y);
            doc.text(item.fullpayment, 450, y);
            doc.text(`${item.balancepayment ? item.balancepayment : 0}`, 600, y);
            doc.text(`${item.createdAt}`, 600, y);
            // Adding border bottom line for each row
            doc.moveTo(50, y + 20).lineTo(600, y + 20).stroke();
            y += 30;
        }

        // finish PDF
        doc.end();
    });
}


//arrange data from new to late on th pdf
//not all rows show