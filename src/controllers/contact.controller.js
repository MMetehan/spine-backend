const { sendContactMail, sendAppointmentMail } = require('../utils/mailer');

/**
 * Handle contact form submission
 */
const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Send email
        await sendContactMail({ name, email, subject, message });

        res.json({
            ok: true,
            message: 'Mesajınız gönderildi. En kısa sürede size döneceğiz.',
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            ok: false,
            error: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        });
    }
};

/**
 * Handle appointment form submission
 */
const submitAppointment = async (req, res) => {
    try {
        const { name, email, phone, preferredDate, message } = req.body;

        // Send email
        await sendAppointmentMail({ name, email, phone, preferredDate, message });

        res.json({
            ok: true,
            message: 'Randevu talebiniz alındı. En kısa sürede size geri dönüş yapılacaktır.',
        });
    } catch (error) {
        console.error('Appointment form error:', error);
        res.status(500).json({
            ok: false,
            error: 'Randevu talebi gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        });
    }
};

module.exports = {
    submitContact,
    submitAppointment,
};
