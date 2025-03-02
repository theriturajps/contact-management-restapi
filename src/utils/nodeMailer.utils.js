import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 465,
	secure: true, // true for port 465, false for other ports
	auth: {
		user: process.env.MAIL_AUTH_USER,
		pass: process.env.MAIL_AUTH_PASS,
	},
});

export const sendMail = async (mailOptions) => {
	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Message sent: %s", info.messageId);
	} catch (error) {
		console.log(error);
	}
};

