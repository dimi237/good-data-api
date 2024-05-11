import { EmailTemplate, TemplateLabel } from "../models";

export const templates: EmailTemplate[] = [
    {
        label: TemplateLabel.INSCRIPTION_TO_USER,
        subject: 'Bienvenue sur Good Data !',
        getBody: (data: any) => {
            const { fname, lname, link } = data;
            return `<p data-sourcepos="5:1-5:31">Bonjour <b> ${fname || ''} ${lname || ''}</b>,</p>
            <p data-sourcepos="7:1-7:73">Nous sommes ravis de vous accueillir au sein de la communauté Good Data !</p>
            <p data-sourcepos="9:1-9:152">Votre compte a été créé avec succès. Vous pouvez désormais accéder à toutes les fonctionnalités de notre plateforme et commencer à analyser vos données.</p>
            <p data-sourcepos="11:1-11:25"><strong>Pour vous connecter :</strong></p>
            <ul data-sourcepos="13:1-15:0">
                <li data-sourcepos="13:1-13:72">Rendez-vous sur <a class="traceable-link" target="_blank" rel="noopener noreferrer" href="${link}">${link}</a></li>
            </ul>`
        }
    },
    {
        label: TemplateLabel.INSCRIPTION_TO_ADMIN,
        subject: 'Nouveau compte utilisateur créé ',
        getBody: (data: any) => {
            const { admin, user } = data;
            return `<p>Objet : Nouveau compte utilisateur créé - Good Data Bonjour ${admin?.username || ''} , 
            Un nouvel utilisateur vient de créer un compte sur Good Data. Informations sur l'utilisateur : Nom : ${user?.fname || ''} ${user?.lname || ''} Adresse e-mail : ${user?.email || ''}  Vous pouvez consulter les détails du compte de l'utilisateur et gérer ses autorisations en vous connectant à votre espace administrateur Good Data :</p>`
        }
    },
    {
        label: TemplateLabel.ADMIN_CREATED_TO_ADMIN,
        subject: ' Nouveau compte administrateur créé - Good Data',
        getBody: (data: any) => {
            const { admin, user } = data;
            return `<p>Bonjour ${admin?.username || ''}, Un nouveau compte administrateur vient d'être créé sur Good Data. Informations sur l'administrateur :  Nom : ${user?.fname || ''} ${user?.lname || ''} Adresse e-mail : ${user?.email || ''}  </p>`
        }
    },
    {
        label: TemplateLabel.ADMIN_CREATED_TO_USER,
        subject: `Bienvenue sur Good Data en tant qu'administrateur !`,
        getBody: (data: any) => {
            const { user,password } = data;
            return `<p>Bonjour ${user?.username || ''}, 
            Bienvenue au sein de l'équipe d'administrateurs Good Data ! Nous sommes ravis de vous avoir parmi nous. </p>
            <p>Votre mot de passe: ${password || ''},</p>`
        }
    },
    {
        label: TemplateLabel.INSCRIPTION_FORMATION_TO_USER,
        subject: `Bienvenue à la formation Good Data !`,
        getBody: (data: any) => {
            const { fname, lname } = data;
            return `<p>Bonjour <b> ${fname || ''} ${lname || ''}</b>, Bienvenue à la formation Good Data en science des données ! Nous sommes ravis de vous accueillir au sein de notre communauté de passionnés de données.</p>
            
            <p>Nous vous contacterons sous peu pour le déroulement de la formation</p>
            <p> Cordialement,</p>
            <p>L'équipe Good Data</p>
            `
        }
    },
    {
        label: TemplateLabel.INSCRIPTION_FORMATION_TO_ADMIN,
        subject: `Un utilisateur s'est inscrit à la session de formation`,
        getBody: (data: any) => {
            const { user, admin } = data;
            return `${admin?.username || ''},

            Un utilisateur vient de s'inscrire à la session de formation 
            
            Informations sur l'utilisateur :
            
           <p> Nom :  <b>${user?.fname || ''} ${user?.lname || ''}</b></p>
           <p> Adresse e-mail : <b>${user?.email || ''}</b> </p>
           <p> Numéro de téléphone : <b>${user?.tel || ''}</b> </p>`
        }
    },
    {
        label: TemplateLabel.REQUEST_INITIATED_TO_USER,
        subject: `Demande d'analyse initiée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname } = data;
            return `Bonjour <b> ${fname || ''} ${lname || ''}</b>,
            Nous avons bien reçu votre demande d'analyse. Notre équipe d'experts est actuellement en train d'examiner vos données et de préparer un rapport personnalisé.`
        }
    },
    {
        label: TemplateLabel.REQUEST_INITIATED_TO_ADMIN,
        subject: `Une nouvelle demande d'analyse a été initiée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request, link } = data;
            return `Bonjour <b> ${fname || ''} ${lname || ''}</b>,

            Un utilisateur vient de soumettre une demande d'analyse.
            
            Détails de la demande :
            
            <p>  Utilisateur : <b> ${request?.user?.username || ''}</b></p>
            <p> Titre de la demande : <b> ${request?.name || ''}</b></p>
            <p> Description : <b> ${request?.desc || ''}</b></p>
        Vous pouvez consulter la demande d'analyse et la gérer en vous connectant à votre espace administrateur Good Data :
            ${link || ''}`
        }
    },
    {
        label: TemplateLabel.REQUEST_VALIDATED_TO_USER,
        subject: `Demande d'analyse validée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request, link } = data;
            return `Bonjour <b> ${fname || ''} ${lname || ''}</b>,

            Nous sommes heureux de vous informer que votre demande d'analyse a été validée. Notre équipe d'experts a commencé à travailler sur votre demande et vous fournira un rapport personnalisé dans les plus brefs délais.
            
            Détails de la demande :
            
            <p>Utilisateur : <b> ${request?.user?.username || ''}</b></p>
            <p>Titre de la demande : <b> ${request?.name || ''}</b></p>
            <p>Description : <b> ${request?.desc || ''}
            <p>Motant du paiement : <b> ${request?.amount || ''} XAF</b></p>
            Vous pouvez suivre l'état d'avancement de votre demande d'analyse et consulter votre rapport en vous connectant à votre espace utilisateur Good Data :
            ${link || ''}`
        }
    },
    {
        label: TemplateLabel.REQUEST_VALIDATED_TO_ADMIN,
        subject: `Demande d'analyse validée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request, link } = data;
            return ``
        }
    },
    {
        label: TemplateLabel.REQUEST_REJECTED_TO_USER,
        subject: ` Demande d'analyse rejetée - Good Data`,
        getBody: (data: any) => {
            const { fullName, request, link } = data;
            return `Bonjour <b> ${fullName|| ''}</b>,

            Nous sommes désolés de vous informer que votre demande d'analyse a été rejetée.

            <p>  Motif du rejet :
            <b> ${request?.reason || ''}</b> </p> 
            Vous pouvez contacter notre équipe d'assistance à l'adresse https://support.gooddata.com/hc/en-us si vous avez des questions concernant le rejet de votre demande d'analyse.`
        }
    },
    {
        label: TemplateLabel.REQUEST_REJECTED_TO_ADMIN,
        subject: ` Demande d'analyse rejetée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request, link } = data;
            return ``
        }
    },

    {
        label: TemplateLabel.REQUEST_CANCELED_TO_USER,
        subject: `Demande d'analyse annulée - Good Data`,
        getBody: (data: any) => {
            const { fullName, request } = data;
            return `Bonjour <b> ${fullName|| ''}</b>,

            Nous avons bien reçu votre notification d'annulation de votre demande d'analyse : ${request?.name || ''}.
            Votre demande d'analyse a été annulée dans notre système`
        }
    },

    {
        label: TemplateLabel.REQUEST_CANCELED_TO_ADMIN,
        subject: `Demande d'analyse annulée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request } = data;
            return `Bonjour <b> ${fname || ''} ${lname || ''}</b>,

            Un utilisateur vient d'annuler la demande d'analyse suivante :
            <p>Titre de la demande : <b> ${request?.name || ''}</b></p>
            <p>Utilisateur : <b> ${request?.user?.username || ''}</b></p>
            La demande d'analyse a été annulée dans le système`
        }
    },
    {
        label: TemplateLabel.REQUEST_PAID_TO_USER,
        subject: `Confirmation de paiement et mise à jour de votre demande d'analyse - Good Data`,
        getBody: (data: any) => {
            const {fullName, request, link } = data;
            return `Bonjour <b> ${fullName|| ''}</b>,

            Nous sommes heureux de vous informer que nous avons bien reçu votre paiement pour votre demande d'analyse : ${request?.name || ''}.

            Votre demande a été mise à jour et est maintenant en cours de traitement.

            Notre équipe d'experts a commencé à examiner vos données et vous fournira un rapport personnalisé dans les plus brefs délais.

            Vous pouvez suivre l'état d'avancement de votre demande d'analyse et consulter votre rapport en vous connectant à votre espace utilisateur Good Data :

            ${link || ''}`
        }
    },
    {
        label: TemplateLabel.REQUEST_PAID_TO_ADMIN,
        subject: `Confirmation de paiement et mise à jour de votre demande d'analyse - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request, link } = data;
            return ``
        }
    },
    {
        label: TemplateLabel.REQUEST_CLOSED_TO_USER,
        subject: ` Demande d'analyse clôturée - Good Data`,
        getBody: (data: any) => {
            const { fullName, request, link } = data;
            return `Bonjour <b> ${fullName|| ''}</b>,

            Nous sommes heureux de vous informer que votre demande d'analyse, ${request?.name || ''}, a été terminée.
            
            Votre rapport est maintenant disponible dans votre espace utilisateur Good Data :
            
            ${link || ''}`
        }
    },
    {
        label: TemplateLabel.REQUEST_CLOSED_TO_USER,
        subject: ` Demande d'analyse clôturée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request, link } = data;
            return ``
        }
    },

]

