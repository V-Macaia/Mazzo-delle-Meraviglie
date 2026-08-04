// =====================================
// SISTEMA DI SALVATAGGIO MULTIPLI
// =====================================



const CHIAVE_SALVATAGGIO = "mazzi_meraviglie";

const CHIAVE_ATTIVO = "mazzo_attivo";




// Recupera tutti i mazzi salvati

function caricaMazzi(){


    let dati =
    localStorage.getItem(CHIAVE_SALVATAGGIO);


    if(!dati){


        let primoMazzo = {

            "Campagna Principale":
            creaNuovoMazzo()

        };


        localStorage.setItem(
            CHIAVE_SALVATAGGIO,
            JSON.stringify(primoMazzo)
        );


        localStorage.setItem(
            CHIAVE_ATTIVO,
            "Campagna Principale"
        );


        return primoMazzo;


    }


    return JSON.parse(dati);

}




// Salva tutti i mazzi

function salvaMazzi(mazzi){


    localStorage.setItem(

        CHIAVE_SALVATAGGIO,

        JSON.stringify(mazzi)

    );


}




// Recupera il nome del mazzo attivo

function mazzoAttivo(){


    return localStorage.getItem(
        CHIAVE_ATTIVO
    );


}




// Cambia campagna

function cambiaMazzo(nome){


    localStorage.setItem(

        CHIAVE_ATTIVO,

        nome

    );


}




// Restituisce il mazzo attualmente utilizzato

function ottieniMazzoCorrente(){


    let mazzi = caricaMazzi();


    let nome =
    mazzoAttivo();


    return mazzi[nome];


}




// Aggiorna il mazzo corrente

function aggiornaMazzoCorrente(dati){


    let mazzi =
    caricaMazzi();


    let nome =
    mazzoAttivo();


    mazzi[nome] = dati;


    salvaMazzi(mazzi);


}




// =====================================
// CREAZIONE NUOVO SALVATAGGIO
// =====================================


function creaMazzo(nome){


    let mazzi =
    caricaMazzi();



    if(mazzi[nome]){


        alert(
        "Esiste già un mazzo con questo nome!"
        );


        return;


    }



    mazzi[nome] =
    creaNuovoMazzo();



    salvaMazzi(mazzi);



    cambiaMazzo(nome);



    aggiornaListaMazzi();



}




// =====================================
// ELIMINAZIONE
// =====================================


function eliminaMazzoSalvato(nome){



    let mazzi =
    caricaMazzi();



    let nomi =
    Object.keys(mazzi);



    if(nomi.length <= 1){


        alert(
        "Deve rimanere almeno un mazzo!"
        );


        return;


    }



    delete mazzi[nome];



    salvaMazzi(mazzi);



    cambiaMazzo(
        Object.keys(mazzi)[0]
    );



    aggiornaListaMazzi();


}




// =====================================
// CAMBIO DAL MENU
// =====================================


function selezionaMazzo(nome){


    cambiaMazzo(nome);


    aggiornaInterfaccia();


}



// =====================================
// AGGIORNA MENU A TENDINA
// =====================================


function aggiornaListaMazzi(){



    let select =
    document.getElementById(
        "listaMazzi"
    );


    if(!select)
    return;



    select.innerHTML="";



    let mazzi =
    caricaMazzi();



    Object.keys(mazzi)
    .forEach(nome=>{


        let opzione =
        document.createElement("option");


        opzione.value =
        nome;


        opzione.textContent =
        nome;



        if(nome === mazzoAttivo()){

            opzione.selected=true;

        }



        select.appendChild(opzione);



    });



    select.onchange=function(){


        selezionaMazzo(
            this.value
        );


    };


}