/**
 * Sending emails using node mailer
 */
const nodemailer=require('nodemailer');

//using mailtrap as our host
    
    // create a transporter
    const transport = nodemailer.createTransport({
    
        host: proces.env.EMAIL_HOST,
        port: proces.env.EMAIL_PORT,
        auth: {
          user: process.env.USER_NAME,
          pass: process.env.PASSWORD
        }
    
      });

      //can define the structure of the mail options or jus insert them direct into the transport.sendEmail() fn
      /*
      const mailOptions={
        from:'senders email username<email>',
        to:options.email,
        subject:options.subject,
        message:options.message
      }*/

    await transport.sendMail({
        from:"Brian kidiga<juniorProgrammer09@gmail.com",
        to:"Naka18mura@gmail.com",
        subject:"An example of a mail sent with node mailer",
        message:"Hello, its brian kidiga."
    }).catch(err=>{
        console.log("there was an error sending the email");
        console.log(err);
    })


  