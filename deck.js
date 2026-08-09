/* =====================================
   MAZZO DELLE MERAVIGLIE
   deck.js
   Gestione carte e regole
===================================== */



// =====================================
// ELENCO CARTE
// =====================================


const carteMazzo = {


    "Artigli": {

        immagine:"artigli.png",

        effetto:
        "Ogni oggetto magico indossato o trasportato viene disintegrato. Gli artefatti svaniscono."

    },


    "Bilancia": {

        immagine:"bilancia.png",

        effetto:
        "La mente viene sconvolta. L'allineamento cambia."

    },


    "Cavaliere": {

        immagine:"cavaliere.png",

        effetto:
        "Ottieni i servigi di un guerriero (A descrizione del master)."

    },


    "Chiave": {

        immagine:"chiave.png",

        effetto:
        "Compare nelle tue mani un'arma magica rara, molto rara o leggendaria con cui sei competente."

    },


    "Cometa": {

        immagine:"cometa.png",

        effetto:
        "Se sconfiggi da solo il prossimo mostro o gruppo ostile: ottieni 1 Punto Destino permanente e puoi ritirare un tiro una volta per sessione."

    },


    "Destino": {

        immagine:"destino.png",

        effetto:
        "Puoi cancellare o modificare un singolo evento come se non fosse mai accaduto."

    },


    "Eurialo": {

        immagine:"eurialo.png",

        effetto:
        "Subisci una penalità permanente di -2 a tutti i tiri salvezza. Rimovibile solo da un dio o dalla carta Destino."

    },


    "Fiamme": {

        immagine:"fiamme.png",

        effetto:
        "Un potente diavolo diventa tuo nemico."

    },


    "Gemma": {

        immagine:"gemma.png",

        effetto:
        "Compaiono 25 gioielli da 2000 mo ciascuno oppure 50 gemme da 1000 mo ciascuna."

    },


    "Giullare": {

        immagine:"giullare.png",

        speciale:true,

        effetto:
        "Ottieni un Talento ma devi pescare due carte aggiuntive."

    },


    "Matta": {

        immagine:"matta.png",

        speciale:true,

        effetto:
        "Perdi una competenza a scelta (Abilità, strumento o lingua) e pesca immediatamente un'altra carta."

    },


    "Ladro": {

        immagine:"ladro.png",

        effetto:
        "Un PNG scelto dal Master diventa tuo nemico permanente."

    },


    "Luna": {

        immagine:"luna.png",

        effetto:
        "Ottieni da 1 a 3 utilizzi dell'incantesimo Desiderio."

    },


    "Prigione": {

        immagine:"prigione.png",

        effetto:
        "Vieni imprigionato in una sfera extradimensionale finché qualcuno non ti libera."

    },


    "Rovina": {

        immagine:"rovina.png",

        effetto:
        "Perdi tutte le ricchezze non magiche."

    },


    "Sole": {

        immagine:"sole.png",

        effetto:
        "Ottieni un Oggetto Meraviglioso determinato dal Master e +2 a una caratteristica (massimo 24)."

    },


    "Stella": {

        immagine:"stella.png",

        effetto:
        "Una caratteristica aumenta di +2 (massimo 24)."

    },


    "Teschio": {

        immagine:"teschio.png",

        effetto:
        "Compare un Avatar della Morte che solo tu puoi affrontare, altrimenti appaiono altri Avatar."

    },


    "Trono": {

        immagine:"trono.png",

        effetto:
        "Ottieni competenza in Persuasione, se sei già competente radoppi il tuo bonus di competenza in quelle prove. Inoltre diventi proprietario di una piccola rocca da qualche parte nel mondo, ma attualmente è brulicante di mostri."

    },


    "Visir": {

        immagine:"visir.png",

        effetto:
        "Entro un anno puoi porre una domanda e ricevere una risposta perfettamente veritiera."

    },


    "Vuoto": {

        immagine:"vuoto.png",

        effetto:
        "La tua anima viene imprigionata in un oggetto nascosto nel mondo."

    }


};





// =====================================
// CREAZIONE NUOVO MAZZO
// =====================================


function creaMazzo(){


    return {


        carteDisponibili:
        Object.keys(carteMazzo),


        cartePescate:[],


        giullareRimaste:2,


        mattaRimaste:2


    };


}





// =====================================
// PESCA CARTA
// =====================================


function pescaDalMazzo(mazzo){


    if(!mazzo)

    return null;



    if(!mazzo.carteDisponibili)

    return null;



    if(!mazzo.cartePescate)

    mazzo.cartePescate = [];



    if(mazzo.carteDisponibili.length === 0){


        return null;


    }



    let indice = Math.floor(

        Math.random() *

        mazzo.carteDisponibili.length

    );



    let carta =

    mazzo.carteDisponibili[indice];



    mazzo.carteDisponibili.splice(

        indice,

        1

    );



    mazzo.cartePescate.push(carta);



    return carta;


}





// =====================================
// REINSERISCI CARTA
// =====================================


function reinserisciNelMazzo(

    mazzo,

    nomeCarta

){


    if(

        carteMazzo[nomeCarta] &&

        !mazzo.carteDisponibili.includes(nomeCarta)

    ){


        mazzo.carteDisponibili.push(nomeCarta);



    }


}


// =====================================
// RIMUOVI CARTA DAL MAZZO
// =====================================

function rimuoviDalMazzo(

    mazzo,

    nomeCarta

){

    if(

        !mazzo ||

        !mazzo.carteDisponibili

    ){

        return false;

    }


    let indice =

    mazzo.carteDisponibili.indexOf(

        nomeCarta

    );


    if(indice === -1){

        return false;

    }


    mazzo.carteDisponibili.splice(

        indice,

        1

    );


    return true;

}


// =====================================
// RESET COMPLETO
// =====================================


function resetMazzo(){


    return creaMazzo();


}





// =====================================
// INFORMAZIONI CARTA
// =====================================


function ottieniCarta(nome){


    return carteMazzo[nome];


}

window.creaMazzo = creaMazzo;
window.pescaDalMazzo = pescaDalMazzo;
window.reinserisciNelMazzo = reinserisciNelMazzo;
window.rimuoviDalMazzo = rimuoviDalMazzo;
window.resetMazzo = resetMazzo;
window.ottieniCarta = ottieniCarta;