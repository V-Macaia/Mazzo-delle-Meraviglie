// =====================================
// MAZZO DELLE MERAVIGLIE
// Database carte e regole
// =====================================



const carteDisponibili = {

    "Artigli": {
        effetto:
        "Ogni oggetto magico indossato o trasportato viene disintegrato. Gli artefatti svaniscono."
    },


    "Bilancia": {
        effetto:
        "La mente viene sconvolta. Se prima eri una persona altruista diventi egoista, se prima eri ligia alle regole ora non più."
    },


    "Cavaliere": {
        effetto:
        "Ottieni i servigi di un guerriero."
    },


    "Chiave": {
        effetto:
        "Compare nelle tue mani un'arma magica (rara, molto rara o leggendaria) con cui sei competente."
    },


    "Cometa": {
        effetto:
        "Se sconfiggi da solo il prossimo mostro o gruppo ostile incontrato ottieni 1 Punto Ispirazione permanente per sessione."
    },


    "Destino": {
        effetto:
        "Puoi cancellare o modificare un singolo evento come se non fosse mai accaduto."
    },


    "Eurialo": {
        effetto:
        "Subisci una penalità permanente di -2 a tutti i tiri salvezza. Può essere rimossa solo da un dio o dalla carta Destino."
    },


    "Fiamme": {
        effetto:
        "Un potente diavolo diventa tuo nemico permanente."
    },


    "Gemma": {
        effetto:
        "Compaiono 25 gioielli da 2000 mo ciascuno oppure 50 gemme da 1000 mo ciascuna."
    },


    "Giullare": {

        effetto:
        "Scegli: ottenere un Talento oppure pescare due carte aggiuntive.",

        doppiaPesca:true

    },


    "Matta": {

        effetto:
        "Perdi una competenza a scelta (abilità, strumento o lingua) e pesca immediatamente un'altra carta.",

        doppiaPesca:true

    },


    "Ladro": {
        effetto:
        "Un PNG scelto dal GM diventa tuo nemico permanente."
    },


    "Luna": {
        effetto:
        "Ottieni da 1 a 3 utilizzi dell'incantesimo Desiderio."
    },


    "Prigione": {
        effetto:
        "Vieni imprigionato in una sfera extradimensionale finché qualcuno non ti libera."
    },


    "Rovina": {
        effetto:
        "Perdi tutte le ricchezze non magiche."
    },


    "Sole": {

        effetto:
        "Ottieni un Oggetto Meraviglioso determinato dal GM e +2 a una caratteristica (massimo 24)."

    },


    "Stella": {

        effetto:
        "Una caratteristica aumenta di +2 (massimo 24)."

    },


    "Teschio": {

        effetto:
        "Compare un Avatar della Morte che solo tu puoi affrontare."

    },


    "Trono": {

        effetto:
        "Ottieni competenza in Persuasione, Expertise in Persuasione e una piccola rocca occupata da mostri."

    },


    "Visir": {

        effetto:
        "Entro un anno puoi porre una domanda e ricevere una risposta perfettamente veritiera."

    },


    "Vuoto": {

        effetto:
        "La tua anima viene imprigionata in un oggetto nascosto nel mondo."

    }

};




// =====================================
// CREAZIONE DI UN NUOVO MAZZO
// =====================================


function creaNuovoMazzo(){


   return {

    carte:
    Object.keys(carteDisponibili),


    pescate:[],


    storico:[],


    giullareDisponibili:2,


    mattaDisponibili:2,


    pescaSpeciale:false


    };


}

const immaginiCarte = {


"Artigli":"artigli.png",

"Bilancia":"bilancia.png",

"Cavaliere":"cavaliere.png",

"Chiave":"chiave.png",

"Cometa":"cometa.png",

"Destino":"destino.png",

"Eurialo":"eurialo.png",

"Fiamme":"fiamme.png",

"Gemma":"gemma.png",

"Giullare":"giullare.png",

"Matta":"matta.png",

"Ladro":"ladro.png",

"Luna":"luna.png",

"Prigione":"prigione.png",

"Rovina":"rovina.png",

"Sole":"sole.png",

"Stella":"stella.png",

"Teschio":"teschio.png",

"Trono":"trono.png",

"Visir":"visir.png",

"Vuoto":"vuoto.png"


};