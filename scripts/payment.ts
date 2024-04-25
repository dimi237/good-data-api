import { getDatabase } from './database';
import { isEmpty } from 'lodash';
import moment from 'moment';

(async () => {
    const db = await getDatabase();
    const payMethods = [
        { label: 'MTN Mobile Money', slug: 'momo', description: 'Pour payer par MTN Mobile Money faites un transfert du montant indiqué à ce numero:', value: '', enabled: false, dates: { created: moment().valueOf(), updated: null } },
        { label: 'Orange Money', slug: 'om', description: 'Pour payer par Orange Money faites un transfert du montant indiqué à ce numero:', value: '', enabled: false, dates: { created: moment().valueOf(), updated: null } },
        { label: 'Yoomee Money', slug: 'yoomee',description: 'Pour payer par Yoomee Money faites un transfert du montant indiqué à ce numero:', value: '', enabled: false, dates: { created: moment().valueOf(), updated: null } },
        { label: 'Paypal', slug: 'paypal',description: 'Pour payer par Paypal faites un transfert du montant indiqué au compte paypal assocué à cet adresse:', value: '', enabled: false, dates: { created: moment().valueOf(), updated: null } }
    ]
    try {
        const tobeInserted = []
        for (const paiement of payMethods) {
            const { slug } = paiement;
            const existing = await db.collection('paiments').findOne({ slug });
            console.log(existing);
            console.log('////////////////////////////');

            if (isEmpty(existing)) { tobeInserted.push(paiement) }
        }

        if (isEmpty(tobeInserted)) { return; }

        const result = await db.collection('paiments').insertMany(tobeInserted);

        if (result instanceof Error) { return result; }

        console.log(`pay methods created successfully`)
    } catch (error: any) {
        console.log(error)
    } finally {
        process.exit();
    }


})()