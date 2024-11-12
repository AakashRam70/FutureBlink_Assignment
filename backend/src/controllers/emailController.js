import agenda from '../config/agenda.js';
import transporter from '../config/nodemailer.js';

export const scheduleEmail = async (req, res) => {
    const { email, subject, body, delay } = req.body;

    try {
        await agenda.schedule(delay, 'send email', { email, subject, body });
        res.status(200).json({ message: 'Email scheduled successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to schedule email' });
    }
};

// Define the job
agenda.define('send email', async (job) => {
    const { email, subject, body } = job.attrs.data;

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject,
            text: body,
        });
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
});
