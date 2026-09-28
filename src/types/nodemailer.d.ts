// Minimale Typen fuer nodemailer — nur das, was pages/api/anfrage.ts
// benutzt. nodemailer bringt keine eigenen Typen mit; statt eines
// weiteren Pakets (@types/nodemailer) steht hier das Noetigste.
// Wird mehr von nodemailer gebraucht, hier ergaenzen.

declare module "nodemailer" {
  interface TransportOptions {
    host: string;
    port: number;
    secure: boolean;
    auth: { user: string; pass: string };
  }

  interface MailOptions {
    from: string;
    to: string;
    replyTo?: string;
    subject: string;
    text: string;
    html?: string;
  }

  interface Transporter {
    sendMail(mail: MailOptions): Promise<unknown>;
  }

  const nodemailer: {
    createTransport(options: TransportOptions): Transporter;
  };

  export default nodemailer;
}
