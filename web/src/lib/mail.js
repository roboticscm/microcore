import nodemailer from 'nodemailer';
import { config } from '$src/config/config';
    
export const sendMail = async ({toList, subject, text, html, from}) => {
    if(!toList || toList.length === 0) {
        throw new Error('No mail receiver');
    }

    const transporter = nodemailer.createTransport({
        host: config.mailServerName,
        port: config.mailServerPort,
        secure: false, 
        auth: {
            user: config.mailSenderUser, 
            pass: config.mailSenderPassword, 
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    });


    return transporter.sendMail({
        from: from || config.mailSenderUser,
        to: Array.isArray(toList) ? toList.join(',') : toList,
        subject: subject || 'Empty subject',
        text: text || '',
        html: html || ''
    });
}