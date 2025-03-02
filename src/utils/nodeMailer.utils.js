import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_AUTH_USER,
		pass: process.env.MAIL_AUTH_PASS,
	},
});


export const sendMail = async (mailTo, mailSubject, mailHtml) => {
	try {
		const info = await transporter.sendMail({
			from: {
				name: "Contact Manager",
				address: process.env.MAIL_AUTH_USER,
			},
			to: mailTo,
			subject: mailSubject,
			html: mailHtml
		});
		console.log("Message sent: %s", info.response);
	} catch (error) {
		console.log(error);
	}
};

