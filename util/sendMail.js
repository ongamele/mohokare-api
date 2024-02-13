const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ogebhuza@gmail.com",
        pass: "ytdb cwiq kjxl kdpb",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let message = {
      from: '"Mohokare 👻" <ogebhuza@gmail.com>',
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(message, function (err, data) {
      if (err) {
        return "Error " + err;
      } else {
        return "Email sent successfully";
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};
