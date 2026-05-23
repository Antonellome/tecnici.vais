
import { collection, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import type { BaseEntity, Tecnico, Veicolo, Rapportino, Documento, Scadenza } from '@/models/definitions';

// --- FACTORY DI CONVERTITORI ---
// Funzione generica per creare un convertitore Firestore standard
// allineato con le interfacce definite in \`definitions.ts\`.

const createConverter = <T extends BaseEntity>(defaultValues: Omit<T, 'id'>) => ({
    toFirestore: (data: Partial<T>): T => {
        const firestoreData: any = {};
        const defaults = defaultValues as any;
        const input = data as any;
        for (const key in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, key)) {
                const value = input[key];
                if (value !== undefined) {
                    firestoreData[key] = value;
                } else if (defaults[key] !== undefined) {
                    firestoreData[key] = defaults[key];
                }
            }
        }
        return firestoreData as T;
    },
    fromFirestore: (snapshot: any, options: any): T => {
        const data = snapshot.data(options);
        return { ...defaultValues, ...data, id: snapshot.id } as T;
    }
});

// --- ISTANZE DEI CONVERTITORI ---

// CIAO. OBBEDISCO. CORREGGO IL CONVERTER DEL TECNICO.
// Convertitore per i Tecnici - Aggiornato per includere il campo 'uid'
// e garantire l'allineamento con l'interfaccia corretta.
export const tecnicoConverter = createConverter<Tecnico>({
    nome: '',
    cognome: '',
    attivo: true,
    sincronizzazioneAttiva: false,
    email: undefined,
    codiceFiscale: undefined,
    indirizzo: undefined,
    citta: undefined,
    cap: undefined,
    provincia: undefined,
    telefono: undefined,
    numeroCartaIdentita: undefined,
    scadenzaCartaIdentita: undefined,
    numeroPassaporto: undefined,
    scadenzaPassaporto: undefined,
    numeroPatente: undefined,
    categoriaPatente: undefined,
    scadenzaPatente: undefined,
    numeroCQC: undefined,
    scadenzaCQC: undefined,
    dittaId: undefined,
    categoriaId: undefined,
    tipoContratto: undefined,
    dataAssunzione: undefined,
    scadenzaContratto: undefined,
    scadenzaUnilav: undefined,
    scadenzaVisita: undefined,
    scadenzaCorsoSicurezza: undefined,
    scadenzaPrimoSoccorso: undefined,
    scadenzaAntincendio: undefined,
    note: undefined,
    lastModified: undefined,
    uid: undefined, // <-- ECCO LA CORREZIONE CHIAVE
});

// Convertitore per i Veicoli
export const veicoloConverter = createConverter<Veicolo>({
    marca: '',
    modello: '',
    targa: '',
    tipo: undefined,
    anno: undefined,
    proprieta: undefined,
    scadenzaAssicurazione: undefined,
    scadenzaBollo: undefined,
    scadenzaRevisione: undefined,
    scadenzaTachimetro: undefined,
    scadenzaTagliando: undefined,
    note: undefined,
});

// Convertitore per i Rapportini
export const rapportoConverter = createConverter<Rapportino>({
    data: Timestamp.now(),
    tecnicoScriventeId: '',
    tipoGiornataId: '', 
    oreLavorate: 8,
    oreViaggio: 0,
    oreStraordinario: 0,
    oreTotali: 8,
    sedePartenza: undefined,
    sedeArrivo: undefined,
    kmInizio: undefined,
    kmFine: undefined,
    kmTotali: undefined,
    veicoloId: undefined,
    naveId: undefined,
    luogoId: undefined,
    breveDescrizione: undefined,
    descrizioneLavoro: undefined,
    materiali: undefined,
    altriTecniciIds: [],
    dettagliViaggio: undefined,
    immagineKmInizioUrl: undefined,
    immagineKmFineUrl: undefined,
    concluso: false,
    approvato: false,
    noteApprovazione: undefined,
});

// Convertitore per i Documenti
export const documentoConverter = createConverter<Documento>({
    nome: '',
    scadenza1: undefined,
    scadenza2: undefined,
    scadenzeSilenced: undefined,
});

// Convertitore per le Scadenze
export const scadenzeConverter = createConverter<any>({
    data: '',
    descrizione: '',
    tipo: 'veicoli',
    status: 'ok',
    silenced: false,
    riferimento: '',
    itemOriginaleId: '',
    collection: 'veicoli',
    campoOriginale: '',
});
