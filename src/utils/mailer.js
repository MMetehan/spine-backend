const nodemailer = require('nodemailer');

// Create transporter using environment variables
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

/**
 * Send contact form email
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Sender name
 * @param {string} contactData.email - Sender email
 * @param {string} contactData.subject - Email subject
 * @param {string} contactData.message - Email message
 */
const sendContactMail = async ({ name, email, subject, message }) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL_TO,
            subject: `İletişim Formu: ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Yeni İletişim Mesajı</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Gönderen:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Mesaj:</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              Bu mesaj Anatolian Spine Clinic web sitesi iletişim formu aracılığıyla gönderilmiştir.
            </p>
          </div>
        </div>
      `,
            text: `
Yeni İletişim Mesajı

Gönderen: ${name}
E-posta: ${email}
Konu: ${subject}

Mesaj:
${message}

Bu mesaj Anatolian Spine Clinic web sitesi iletişim formu aracılığıyla gönderilmiştir.
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Contact email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending contact email:', error);
        throw new Error('E-posta gönderilirken bir hata oluştu');
    }
};

/**
 * Send appointment request email
 * @param {Object} appointmentData - Appointment form data
 * @param {string} appointmentData.name - Patient name
 * @param {string} appointmentData.email - Patient email
 * @param {string} appointmentData.phone - Patient phone
 * @param {string} appointmentData.preferredDate - Preferred appointment date
 * @param {string} appointmentData.message - Additional message
 */
const sendAppointmentMail = async ({ name, email, phone, preferredDate, message }) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL_TO,
            subject: `Yeni Randevu Talebi - ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Yeni Randevu Talebi</h2>
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <p><strong>Hasta Adı:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone}</p>
            <p><strong>Tercih Edilen Tarih:</strong> ${preferredDate}</p>
          </div>
          ${message ? `
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Ek Mesaj:</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              Bu randevu talebi Anatolian Spine Clinic web sitesi randevu formu aracılığıyla gönderilmiştir.
            </p>
          </div>
        </div>
      `,
            text: `
Yeni Randevu Talebi

Hasta Adı: ${name}
E-posta: ${email}
Telefon: ${phone}
Tercih Edilen Tarih: ${preferredDate}

${message ? `Ek Mesaj:\n${message}\n` : ''}

Bu randevu talebi Anatolian Spine Clinic web sitesi randevu formu aracılığıyla gönderilmiştir.
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Appointment email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending appointment email:', error);
        throw new Error('E-posta gönderilirken bir hata oluştu');
    }
};

module.exports = {
    sendContactMail,
    sendAppointmentMail,
};
