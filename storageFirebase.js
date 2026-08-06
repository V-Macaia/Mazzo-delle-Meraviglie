/* =====================================
   MAZZO DELLE MERAVIGLIE
   storageFirebase.js

   Sistema salvataggi Firebase
===================================== */



// =====================================
// COLLEGAMENTO FIREBASE
// =====================================


import { database } from "./firebase.js";


import {

    ref,

    get,

    set,

    remove,

    onValue

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Percorso nel database

const PERCORSO_DATABASE = "campagne";


// =====================================
// CARICA TUTTE LE CAMPAGNE
// =====================================


async function caricaSalvataggi(){



    const riferimento =

    ref(

        database,

        PERCORSO_DATABASE

    );



    const risultato =

    await get(riferimento);



    if(

        risultato.exists()

    ){


        return risultato.val();


    }



    return {};



}








// =====================================
// SALVA TUTTE LE CAMPAGNE
// =====================================


async function salvaDati(dati){



    const riferimento =

    ref(

        database,

        PERCORSO_DATABASE

    );



    await set(

        riferimento,

        dati

    );



}








// =====================================
// CREA NUOVA CAMPAGNA
// =====================================


async function creaCampagna(nome){



    let campagne =

    await caricaSalvataggi();




    if(

        campagne[nome]

    ){


        return false;


    }





    campagne[nome] = {

    nome:nome,

    ultimaCarta:null,

    mazzo:creaMazzo()

};





    await salvaDati(campagne);



    return true;



}








// =====================================
// ELIMINA CAMPAGNA
// =====================================


async function eliminaCampagna(nome){



    let riferimento =

    ref(

        database,

        PERCORSO_DATABASE + "/" + nome

    );



    await remove(riferimento);



    return true;



}








// =====================================
// OTTIENI CAMPAGNA
// =====================================


async function ottieniCampagna(nome){



    let campagne =

    await caricaSalvataggi();



    return campagne[nome];



}








// =====================================
// SALVA UNA CAMPAGNA SPECIFICA
// =====================================


async function salvaCampagna(nome, campagna){



    let riferimento =

    ref(

        database,

        PERCORSO_DATABASE + "/" + nome

    );



    await set(

        riferimento,

        campagna

    );



}








// =====================================
// ELENCO CAMPAGNE
// =====================================


async function elencoCampagne(){



    let campagne =

    await caricaSalvataggi();



    return Object.keys(campagne);



}








// =====================================
// INIZIALIZZAZIONE
// =====================================


async function inizializzaSalvataggi(){



    let campagne =

    await caricaSalvataggi();




    if(

        Object.keys(campagne).length === 0

    ){


        await creaCampagna(

            "Prima Campagna"

        );


    }



}



function ascoltaCampagna(nome, funzioneAggiornamento){

    const riferimento = ref(

    database,

    PERCORSO_DATABASE + "/" + nome

);

    onValue(

        riferimento,

        (snapshot)=>{


            if(snapshot.exists()){


                funzioneAggiornamento(

                    snapshot.val()

                );


            }


        }

    );

    
}

function ascoltaElencoCampagne(funzioneAggiornamento){

    const riferimento = ref(
        database,
        PERCORSO_DATABASE
    );

    onValue(riferimento,(snapshot)=>{

        if(snapshot.exists()){

            funzioneAggiornamento(
                Object.keys(snapshot.val())
            );

        }else{

            funzioneAggiornamento([]);

        }

    });

}




// =====================================
// ESPORTAZIONE
// =====================================


export{

    caricaSalvataggi,

    salvaDati,

    creaCampagna,

    eliminaCampagna,

    ottieniCampagna,

    salvaCampagna,

    elencoCampagne,

    inizializzaSalvataggi,

    ascoltaCampagna,
    
    ascoltaElencoCampagne

};
