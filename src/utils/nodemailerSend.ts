import nodemailer from 'nodemailer';

export class Nodemailer {


  static sendEmail(mensagem:string,assunto:string) {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Example: Gmail, Outlook, etc.
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASSWORD, // Use environment variables
      },
    });
    
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: process.env.ADRESS, // Recipient's email address
      subject: assunto,
      text: mensagem,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log( error);
      } else {
        console.log(info.response);
      }
    });
  }
}
