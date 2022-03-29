
import { restError, restOk } from '$lib/rest';
import nodemailer from 'nodemailer';

// Login
export const post = async ({ request }) => {
    try {
        const body = await request.json();
        console.log(body);
        await sendMail();
        return restOk({})
    } catch (err) {
        return restError({ unknownError: 'sys.msg.authentication failed' }, 422, err)
    }
}


const sendMail = async () => {
    const transporter = nodemailer.createTransport({
        host: "greenfieldvn.link",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'khailv', // generated ethereal user
            pass: '1234', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <khailv@greenfieldvn.link>', // sender address
        to: "roboticscm2018@gmail.com, roboticscm2020@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}