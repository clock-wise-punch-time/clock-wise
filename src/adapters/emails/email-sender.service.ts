import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from 'src/application/ports/dtos/send-email.dto';
import { IEmailSender } from 'src/application/ports/emails/email-sender.port';

@Injectable()
export class EmailSenderService implements IEmailSender {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({
    to,
    subject,
    content,
    filePath,
  }: SendEmailDto): Promise<void> {
    await this.mailerService.sendMail({
      to: to,
      subject: subject,
      text: content,
      attachments: [
        {
          filename: 'punch-clock-report.csv',
          path: filePath,
        },
      ],
    });
  }
}
