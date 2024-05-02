
import { Service } from "typedi";
import { BulkNotifications, Email, Sms, Notification, TemplateLabel, DataToBind } from "./models";
import { ChannelService } from "queue/channel";
import readFilePromise from 'fs-readfile-promise';
import handlebars from "handlebars";
import { templates } from "./data/templates";
import { errorMsg } from "common/utils";


@Service()
export class NotificationsService {
    templateHtml: any;
    constructor(private readonly channelService: ChannelService) {

        (async () => {
            this.templateHtml = await readFilePromise(__dirname + '/templates/mail.template.html', 'utf8');
        })();
    }

    async sendBulkEmail(data: BulkNotifications) {
        try {
            return await this.sendToqueue('bulkEmail', data)
        }
        catch (error) { throw (error); }
    }

    async sendBulkSms(data: BulkNotifications) {
        try {
            return await this.sendToqueue('bulkSms', data)
        }
        catch (error) { throw (error); }
    }

    async sendEmail(data: Email) {
        try {
            return await this.sendToqueue('email', data)
        }
        catch (error) { throw (error); }
    }

    async sendSms(data: Sms) {
        try {
            return await this.sendToqueue('sms', data)
        }
        catch (error) { throw (error); }
    }

    private prepareTemplate(info: DataToBind) {
        try {

            const template = handlebars.compile(this.templateHtml);

            const html = template(info);

            return html;
        }
        catch (error) { throw (error); }
    }

    async sendEmailNotification(email: string, templateLabel: TemplateLabel, info: any) {
        try {
            const templateData = templates.find((elt) => elt?.label === templateLabel);

            if (!templateData) { return errorMsg.NOT_FOUND }

            const { subject } = templateData;

            const body = templateData.getBody(info);

            const html = this.prepareTemplate({ subject, body });

            const data: Email = {
                email,
                object: subject,
                message: html,
                type: 'EMAIL',
                cc: "",
                attachements: []
            }
            return await this.sendToqueue('email', data)
        }
        catch (error) { throw (error); }
    }


    private async sendToqueue(queue: string, data: Notification | BulkNotifications) {
        data.status = 'PENDING';
        await this.channelService.sendToqueue(queue, data);
        return {
            message: 'Sent to queue',
            status: data.status
        };

    }

}
