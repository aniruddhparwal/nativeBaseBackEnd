const sgmail = require("@sendgrid/mail");

const API_KEY = process.env.SENDGRID_KEY;
sgmail.setApiKey(API_KEY);

const sendEmail = (email, token) => {
  sgmail
    .send({
      to: email,
      from: "solocurioso123@gmail.com",
      subject: "Verify your email -- Native Base Hackathon",
      html: `<h1>Please Click a given Link to activate your account</h1>
    <a href="http://localhost:4000/api/v1/emailverify/${token}">Click Here</a> 
`,
    })
    .then(() => {
      // res.json({ message: "Succesfully mail send" });
    });
};

module.exports = sendEmail;
