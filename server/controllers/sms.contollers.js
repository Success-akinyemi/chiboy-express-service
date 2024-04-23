import axios from 'axios'

export async function sendSms(req, res){
    const {message, phoneNumbers} = req.body
    try {
        if(!message){
            return res.status(404).json({ success: false, data: 'Message is empty, please write a message'})
        }
        if(!phoneNumbers){
            return res.status(404).json({ success: false, data: 'phone number list is empty'})
        }
        console.log(phoneNumbers)
        const phoneNumbersStr = phoneNumbers.join(',');
        console.log(phoneNumbersStr);
    
        const sendMsg = await axios.post(`https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=${process.env.SMS_TOKEN}&from=${process.env.SMS_SENDER}&to=${phoneNumbersStr}&body=${message}&dnd=1`)
        console.log(sendMsg.data)
        const success = sendMsg.data.data.status
        console.log(success)
        if(sendMsg.data.error){
            return res.status(500).json({ success: false, data: sendMsg.data.error.message})
        }
        if(sendMsg.data.data.status === 'success'){
            return res.status(200).json({ success: true, data: 'message sent'})
        }
        res.status(300)
    } catch (error) {
        console.log('UNABLE TO SEND SMS', error)
        res.status(500).json({ success: false, data: 'Unable to send sms'})
    }
}

//get wallet ballance
export async function getSmsBalance(req, res){
    try {
        const getBalance = await axios.get(`https://www.bulksmsnigeria.com/api/v2/balance?api_token=${process.env.SMS_TOKEN}`)
        console.log(getBalance.data)

        if(getBalance.data.data.status = 'success'){
            res.status(200).json({ success: true, data: getBalance.data.balance.total_balance})
        }
    } catch (error) {
        console.log('Unable to get wallet balance')
        res.status(500).json({ success: false, data: 'Unable to get wallet balance'})
    }
}