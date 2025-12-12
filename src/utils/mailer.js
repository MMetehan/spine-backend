const { Resend } = require("resend");

// Resend API client
const resend = new Resend(process.env.RESEND_TOKEN);

console.log(
  "[mailer] Resend initialized with token:",
  process.env.RESEND_TOKEN ? "***set***" : "***missing***"
);

/**
 * Send contact form email via Resend
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Sender name
 * @param {string} contactData.email - Sender email
 * @param {string} contactData.phone - Sender phone
 * @param {string} contactData.subject - Email subject
 * @param {string} contactData.message - Email message
 */
const sendContactMail = async ({ name, email, phone, subject, message }) => {
  try {
    console.log("[mailer] sendContactMail via Resend", {
      to: process.env.ADMIN_EMAIL_TO,
      subject: `İletişim Formu: ${subject}`,
      from: process.env.SMTP_USER,
    });

    const { data, error } = await resend.emails.send({
      from: `Anatolian Spine <${
        process.env.SMTP_USER || "info@anatolianspine.com"
      }>`,
      to: [process.env.ADMIN_EMAIL_TO || "info@anatolianspine.com"],
      subject: `İletişim Formu: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">📧 Yeni İletişim Mesajı</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Gönderen:</strong> ${name}</p>
            <p><strong>📧 E-posta:</strong> ${email}</p>
            <p><strong>📞 Telefon:</strong> ${phone}</p>
            <p><strong>📝 Konu:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">💬 Mesaj:</h3>
            <p style="line-height: 1.6; color: #475569;">${(
              message || ""
            ).replace(/\n/g, "<br>")}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              📋 Bu mesaj Anatolian Spine Clinic web sitesi iletişim formu aracılığıyla gönderilmiştir.
            </p>
          </div>
        </div>
      `,
      text: `
📧 Yeni İletişim Mesajı

👤 Gönderen: ${name}
📧 E-posta: ${email}
📞 Telefon: ${phone}
📝 Konu: ${subject}

💬 Mesaj:
${message || ""}

📋 Bu mesaj Anatolian Spine Clinic web sitesi iletişim formu aracılığıyla gönderilmiştir.
      `,
    });

    if (error) {
      console.error("❌ Resend error sending contact email:", error);
      throw new Error("E-posta gönderilirken bir hata oluştu");
    }

    console.log("✅ Contact email sent via Resend:", data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("❌ Error sending contact email:", error);
    throw new Error("E-posta gönderilirken bir hata oluştu");
  }
};

/**
 * Send appointment request email via Resend
 * @param {Object} appointmentData - Appointment form data
 * @param {string} appointmentData.name - Patient full name
 * @param {string} appointmentData.email - Patient email
 * @param {string} appointmentData.phone - Patient phone
 * @param {string} appointmentData.preferredDate - Preferred appointment date
 * @param {string} appointmentData.preferredTime - Preferred appointment time
 * @param {string} appointmentData.department - Department
 * @param {string} appointmentData.message - Additional message
 * @param {string} appointmentData.consent - Patient consent
 */
const sendAppointmentMail = async ({
  name,
  email,
  phone,
  preferredDate,
  preferredTime,
  department,
  message,
  consent,
}) => {
  try {
    console.log("[mailer] sendAppointmentMail via Resend", {
      to: process.env.ADMIN_EMAIL_TO,
      subject: `🏥 Yeni Randevu Talebi - ${name} (${department})`,
      from: process.env.SMTP_USER,
    });

    const { data, error } = await resend.emails.send({
      from: `Anatolian Spine <${
        process.env.SMTP_USER || "info@anatolianspine.com"
      }>`,
      to: [process.env.ADMIN_EMAIL_TO || "info@anatolianspine.com"],
      subject: `🏥 Yeni Randevu Talebi - ${name} (${department})`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">🏥 Yeni Randevu Talebi</h2>
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3 style="margin-top: 0; color: #dc2626;">Hasta Bilgileri</h3>
            <p><strong>👤 Hasta Adı:</strong> ${name}</p>
            <p><strong>📧 E-posta:</strong> ${email}</p>
            <p><strong>📞 Telefon:</strong> ${phone}</p>
            <p><strong>🏥 Bölüm:</strong> ${department}</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0284c7;">
            <h3 style="margin-top: 0; color: #0284c7;">Randevu Detayları</h3>
            <p><strong>📅 Tercih Edilen Tarih:</strong> ${preferredDate}</p>
            <p><strong>🕐 Tercih Edilen Saat:</strong> ${preferredTime}</p>
            <p><strong>✅ Kişisel Veri Onayı:</strong> ${
              consent === "on" ? "Verildi ✅" : "Verilmedi ❌"
            }</p>
          </div>

          ${
            message
              ? `
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">💬 Ek Mesaj:</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          `
              : ""
          }
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              📋 Bu randevu talebi Anatolian Spine Clinic web sitesi randevu formu aracılığıyla gönderilmiştir.
            </p>
          </div>
        </div>
      `,
      text: `
🏥 Yeni Randevu Talebi

Hasta Bilgileri:
👤 Hasta Adı: ${name}
📧 E-posta: ${email}
📞 Telefon: ${phone}
🏥 Bölüm: ${department}

Randevu Detayları:
📅 Tercih Edilen Tarih: ${preferredDate}
🕐 Tercih Edilen Saat: ${preferredTime}
✅ Kişisel Veri Onayı: ${consent === "on" ? "Verildi" : "Verilmedi"}

${message ? `💬 Ek Mesaj:\n${message}\n` : ""}

📋 Bu randevu talebi Anatolian Spine Clinic web sitesi randevu formu aracılığıyla gönderilmiştir.
      `,
    });

    if (error) {
      console.error("❌ Resend error sending appointment email:", error);
      throw new Error("E-posta gönderilirken bir hata oluştu");
    }

    console.log("✅ Appointment email sent via Resend:", data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("❌ Error sending appointment email:", error);
    throw new Error("E-posta gönderilirken bir hata oluştu");
  }
};

// Exported API
module.exports = {
  sendContactMail,
  sendAppointmentMail,
};
