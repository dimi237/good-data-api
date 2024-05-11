import { Inscription } from "./models";
import { InscriptionRepository } from "./inscriptions.repository";
import { BaseService } from "common";
import { Service } from "typedi";
import { NotificationsService, TemplateLabel } from "modules/notifications";
import { UsersService } from "..";
import { isEmpty } from "lodash";


@Service()
export class InscriptionsService extends BaseService<Inscription> {

    constructor(private readonly inscriptionRepository: InscriptionRepository,
        private notificationsService: NotificationsService,
        private usersService: UsersService,
    ) {
        super(inscriptionRepository);
    }


    async inscription(inscription: Inscription) {
        try {
            const {fname, lname, email, tel} = inscription;
            const result = await this.create(inscription as any);
            await this.notificationsService.sendEmailNotification(email, TemplateLabel.INSCRIPTION_FORMATION_TO_USER, { fname, lname });
            const admins = await this.usersService.getAdminUsers();
            if(!isEmpty(admins)){
                await Promise.all(admins.map((admin)=> {
                this.notificationsService.sendEmailNotification(admin?.email, TemplateLabel.INSCRIPTION_FORMATION_TO_ADMIN, { admin, user:{fname, lname,email,tel }});
                }));
            }
            return result;
        }
        catch (error) { throw (error); }
    }

}
