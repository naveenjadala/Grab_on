const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "njadala@gmail.com",
    password: "naveen77",
  },
});

// Set up email data
let mailOptions = {
  from: "naveen.jadala@gmail.com",
  to: "naveen.jadala@gmail.com",
  subject: "Test Email",
  text: "This is a test email sent from Node.js.",
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error occurred: " + error.message);
  } else {
    console.log("Email sent: " + info.response);
  }
});
