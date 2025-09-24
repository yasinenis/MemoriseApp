import nodemailer from 'nodemailer';

export async function sendMail(req, res) {
  try {
    const outputMessage = `
    <h3>Mail Details </h3>
    <ul class="border">
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    <li>Mail Status: ${
      req.session.email === req.body.email
        ? '🟢 registered mail'
        : '🟡 non registered mail'
    }</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    //<i class="fa-solid fa-user-shield"></i>
    let transporter = nodemailer.createTransport({
      host: `smtp.gmail.com`,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL, // gmail account
        pass: process.env.APP_PASS, // gmail password
      },
    });

    let info = await transporter.sendMail({
      from: `"Memoris Contact Form" <${process.env.MAIL}>`, // sender address
      to: process.env.MAIL,
      replyTo: `${req.body.email}`,
      subject: 'Memoris Contact Form New Message',
      html: outputMessage,
    });

    console.log('Message sent: %s', info.messageId);

    //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.status(200).redirect('/contact');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err.message,
    });
  }
}
