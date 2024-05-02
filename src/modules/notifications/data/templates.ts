import { EmailTemplate, TemplateLabel } from "../models";

export const templates: EmailTemplate[] = [
    {
        label: TemplateLabel.INSCRIPTION_TO_USER,
        subject: 'Bienvenue sur Good Data !',
        getBody: (data: any) => {
            const { fname, lname, link } = data;
            return `<p data-sourcepos="5:1-5:31">Bonjour ${fname || ''} ${lname || ''},</p>
            <p data-sourcepos="7:1-7:73">Nous sommes ravis de vous accueillir au sein de la communauté Good Data !</p>
            <p data-sourcepos="9:1-9:152">Votre compte a été créé avec succès. Vous pouvez désormais accéder à toutes les fonctionnalités de notre plateforme et commencer à analyser vos données.</p>
            <p data-sourcepos="11:1-11:25"><strong>Pour vous connecter :</strong></p>
            <ul data-sourcepos="13:1-15:0">
                <li data-sourcepos="13:1-13:72">Rendez-vous sur <a class="traceable-link" target="_blank" rel="noopener noreferrer" href="${link}">${link}</a></li>
                <li data-sourcepos="14:1-15:0">Saisissez votre adresse e-mail et votre mot de passe</li>
            </ul>
            <p data-sourcepos="16:1-16:24"><strong>En cas de problème :</strong></p>
            <p data-sourcepos="18:1-18:194">Si vous rencontrez des difficultés pour vous connecter, n'hésitez pas à contacter notre support client à l'adresse <a class="traceable-link" target="_blank" rel="noopener noreferrer" href="https://support.gooddata.com/hc/en-us">https://support.gooddata.com/hc/en-us</a>.</p>
            <p data-sourcepos="20:1-20:66"><strong>Nous vous souhaitons une excellente expérience sur Good Data !</strong></p>
            <p data-sourcepos="22:1-22:22"><strong>L'équipe Good Data</strong></p>
            <p data-sourcepos="24:1-24:22"><strong>Personnalisation :</strong></p>
            <p data-sourcepos="26:1-26:48">Vous pouvez personnaliser ce texte en incluant :</p>
            <ul data-sourcepos="28:1-32:0">
                <li data-sourcepos="28:1-28:25">Le nom de l'utilisateur</li>
                <li data-sourcepos="29:1-29:42">Un lien direct vers la page de connexion</li>
                <li data-sourcepos="30:1-30:71">Des informations supplémentaires sur les fonctionnalités de Good Data</li>
                <li data-sourcepos="31:1-32:0">Une offre promotionnelle ou un code de réduction</li>
            </ul>
            <p data-sourcepos="33:1-33:28"><strong>Ton de la notification :</strong></p>
            <p data-sourcepos="35:1-35:195">Le ton de la notification doit être accueillant, professionnel et enthousiaste. Vous pouvez également utiliser un langage plus personnel en vous adressant directement à l'utilisateur par son nom.</p>
            <p data-sourcepos="37:1-37:33"><strong>Objectif de la notification :</strong></p>
            <p data-sourcepos="39:1-39:277">L'objectif principal de cette notification est de confirmer la création du compte de l'utilisateur et de l'inviter à se connecter à la plateforme. La notification peut également inclure des informations supplémentaires sur les fonctionnalités de Good Data et le support client.</p>
            <p data-sourcepos="41:1-41:23"><strong>Actions possibles :</strong></p>
            <p data-sourcepos="43:1-43:156">L'utilisateur peut cliquer sur le lien de connexion pour accéder à son compte. Il peut également contacter le support client s'il rencontre des difficultés.</p>
            <p data-sourcepos="45:1-45:108">N'hésitez pas à me solliciter pour d'autres exemples de textes de notification ou pour toute autre question.</p>`
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
        subject: `Bienvenue sur Good Data en tant qu'administrateur !`,
        getBody: (data: any) => {
            const { fname, lname } = data;
            return `<p>Bonjour ${fname || ''} ${lname || ''}, Bienvenue au sein de l'équipe d'administrateurs Good Data ! Nous sommes ravis de vous avoir parmi nous.</p>`
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
            
            Nom : ${user?.fname || ''} ${user?.lname || ''}
            Adresse e-mail : ${user?.email || ''}`
        }
    },
    {
        label: TemplateLabel.REQUEST_INITIATED_TO_USER,
        subject: `Demande d'analyse initiée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname } = data;
            return `Bonjour ${fname || ''} ${lname || ''},
            Nous avons bien reçu votre demande d'analyse. Notre équipe d'experts est actuellement en train d'examiner vos données et de préparer un rapport personnalisé.`
        }
    },
    {
        label: TemplateLabel.REQUEST_INITIATED_TO_ADMIN,
        subject: `Une nouvelle demande d'analyse a été initiée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request, link } = data;
            return `Bonjour ${fname || ''} ${lname || ''},

            Un utilisateur vient de soumettre une demande d'analyse.
            
            Détails de la demande :
            
            Utilisateur : ${request?.user?.username || ''}
            Titre de la demande : ${request?.name || ''}
            Description : ${request?.desc || ''}
            Vous pouvez consulter la demande d'analyse et la gérer en vous connectant à votre espace administrateur Good Data :
            ${link || ''}`
        }
    },
    {
        label: TemplateLabel.REQUEST_VALIDATED_TO_USER,
        subject: `Demande d'analyse validée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request, link } = data;
            return `Bonjour ${fname || ''} ${lname || ''},

            Nous sommes heureux de vous informer que votre demande d'analyse a été validée. Notre équipe d'experts a commencé à travailler sur votre demande et vous fournira un rapport personnalisé dans les plus brefs délais.
            
            Détails de la demande :
            
            Utilisateur : ${request?.user?.username || ''}
            Titre de la demande : ${request?.name || ''}
            Description : ${request?.desc || ''}
            Motant du paiement : ${request?.amount || ''}
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
            const { fname, lname, request, link } = data;
            return `Bonjour ${fname || ''} ${lname || ''},

            Nous sommes désolés de vous informer que votre demande d'analyse a été rejetée.

            Motif du rejet :
            ${request?.reason || ''}
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
            const { fname, lname, request } = data;
            return `Bonjour ${fname || ''} ${lname || ''},

            Nous avons bien reçu votre notification d'annulation de votre demande d'analyse : ${request?.name || ''}.
            Votre demande d'analyse a été annulée dans notre système`
        }
    },

    {
        label: TemplateLabel.REQUEST_CANCELED_TO_ADMIN,
        subject: `Demande d'analyse annulée - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request } = data;
            return `Bonjour ${fname || ''} ${lname || ''},

            Un utilisateur vient d'annuler la demande d'analyse suivante :
            Titre de la demande : ${request?.name || ''}
            Utilisateur : ${request?.user?.username || ''}
            La demande d'analyse a été annulée dans le système`
        }
    },
    {
        label: TemplateLabel.REQUEST_PAID_TO_USER,
        subject: `Confirmation de paiement et mise à jour de votre demande d'analyse - Good Data`,
        getBody: (data: any) => {
            const { fname, lname, request, link } = data;
            return `Bonjour ${fname || ''} ${lname || ''},

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
            const { fname, lname, request, link } = data;
            return `Bonjour ${fname || ''} ${lname || ''},

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

