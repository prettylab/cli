import mail from "@prettylab/mail/mail";

export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html: string,
  attachments?: Array<any>,
) => {
  const mailer = await mail.sendMail({
    from: process.env.MAIL_SENDER_NAME,
    to,
    subject,
    text,
    html,
    attachments,
  });

  return !!mailer.messageId;
};
