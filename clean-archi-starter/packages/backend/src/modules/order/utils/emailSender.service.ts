export class emailSenderService {
    async sendEmail(emailContent, emailSubject, emailTo) {
        const email = new EmailTemplate(emailContent,emailSubject, emailTo);
        const emailContent = "<h1>Order created</h1>";
        const emailSubject = "Order created";
        const emailTo = "admin@supercommerce.com";
             await email.sendEmail();

    }
}

