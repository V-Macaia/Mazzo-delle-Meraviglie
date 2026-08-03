/* =====================================
   MAZZO DELLE MERAVIGLIE
   storage.js
   Sistema salvataggi campagne
===================================== */



// =====================================
// NOME SALVATAGGIO
// =====================================


const CHIAVE_SALVATAGGIO =

"mazzo_meraviglie_salvataggi";





// =====================================
// CARICA TUTTI I SALVATAGGI
// =====================================


function caricaSalvataggi(){



    let dati =

    localStorage.getItem(

        CHIAVE_SALVATAGGIO

    );



    if(!dati){


        return {};


    }



    return JSON.parse(dati);


}






// =====================================
// SALVA TUTTI I DATI
// =====================================


function salvaDati(dati){



    localStorage.setItem(

        CHIAVE_SALVATAGGIO,

        JSON.stringify(dati)

    );


}






// =====================================
// CREA NUOVA CAMPAGNA
// =====================================


function creaCampagna(nome){



    let campagne =

    caricaSalvataggi();



    if(

        campagne[nome]

    ){


        return false;


    }




    campagne[nome] = {

        nome:nome,


        mazzo:creaMazzo()


    };



    salvaDati(campagne);



    return true;



}






// =====================================
// ELIMINA CAMPAGNA
// =====================================


function eliminaCampagna(nome){



    let campagne =

    caricaSalvataggi();



    if(

        campagne[nome]

    ){


        delete campagne[nome];


        salvaDati(campagne);


        return true;


    }



    return false;


}






// =====================================
// OTTIENI CAMPAGNA
// =====================================


function ottieniCampagna(nome){



    let campagne =

    caricaSalvataggi();



    return campagne[nome];



}






// =====================================
// SALVA UNA CAMPAGNA SPECIFICA
// =====================================


function salvaCampagna(nome, campagna){



    let campagne =

    caricaSalvataggi();



    campagne[nome] = campagna;



    salvaDati(campagne);



}






// =====================================
// ELENCO CAMPAGNE
// =====================================


function elencoCampagne(){



    let campagne =

    caricaSalvataggi();



    return Object.keys(campagne);



}






// =====================================
// CARICA O CREA CAMPAGNA BASE
// =====================================


function inizializzaSalvataggi(){



    let campagne =

    caricaSalvataggi();



    if(

        Object.keys(campagne).length === 0

    ){


        creaCampagna(

            "Prima Campagna"

        );


    }


}