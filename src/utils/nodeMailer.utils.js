import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 465,
	secure: true, // true for port 465, false for other ports
	auth: {
		user: "maddison53@ethereal.email",
		pass: "jn7jnAPss4f63QBp6D",
	},
});