import Mailgun from "mailgun.js";
import FormData from "form-data";
import config from "../config";
import { injectable } from "inversify";
import { IMailgunClient } from "mailgun.js/Interfaces";

@injectable()
export class Mail {
  private readonly mg: IMailgunClient;

  constructor() {
    const mailgun = new Mailgun(FormData);
    this.mg = mailgun.client({
      username: "api",
      key: config.mailgun.key as string,
    });
  }

  async sendMail(id: number, userEmail: string, code: number) {
    const verifyLink = `http://localhost:7171/auth/emailVerify?id=${id}&code=${code}`;

    const result = await this.mg.messages.create(config.mailgun.domain as string, {
        from: config.mailgun.sender,
        to: `${userEmail}`,
      subject: "Email verification code",
      html: `<p>Click the link below to verify your email:</p>
               <a href="${verifyLink}">Verify Email</a>`,
    });
  }

  async passwordReset(userEmail: string, code: number) {
    await this.mg.messages.create(config.mailgun.domain as string, {
      from: config.mailgun.sender,
      to: `${userEmail}`,
      subject: "Password reset code",
      html: `<p>Your code to reset password is ${code}</p>`,
    });
}
}