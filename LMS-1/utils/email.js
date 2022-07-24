const nodemailer=require('nodemailer');

const sendEmail=(options)=>{

    const transporter=nodemailer.createTransport(

    )

    const emailOpt={
        from:'<HeadQuaters>',
        to:options.to,
        Subject:options.Subject,
        message:options.text

    }

    await transporter.sendMail(emailOpt);
}

module.exports=sendEmail;