import { SendEmailDto } from "src/application/ports/dtos/send-email.dto";

export interface IEmailSender {
  sendEmail(data: SendEmailDto): Promise<void>;
}
