let modalitaMaster = false;


const PASSWORD_MASTER = "DM2026";

/* =====================================
   MAZZO DELLE MERAVIGLIE
   app.js
   Collegamento interfaccia
===================================== */



// =====================================
// VARIABILI GLOBALI
// =====================================


let campagnaAttuale = null;

let nomeCampagnaAttuale = null;






// =====================================
// AVVIO PROGRAMMA
// =====================================


window.onload = function(){


    inizializzaSalvataggi();


    caricaListaCampagne();


    let campagne = elencoCampagne();


    if(campagne.length > 0){


        cambiaCampagna(campagne[0]);


    }



    collegaPulsanti();
    


};






// =====================================
// COLLEGAMENTO PULSANTI
// =====================================


function collegaPulsanti(){



    document
    .getElementById("pesca")
    .onclick = pesca;



    document
    .getElementById("reset")
    .onclick = reset;



    document
    .getElementById("nuovaCampagna")
    .onclick = nuovaCampagna;



    document
    .getElementById("eliminaCampagna")
    .onclick = elimina;



    document
    .getElementById("listaCampagne")
    .onchange = function(){


        cambiaCampagna(this.value);


    };



    document
    .getElementById("reinserisci")
    .onclick = reinserisci;

    document
   .getElementById("entraMaster")
   .onclick = entraMaster;


   document
   .getElementById("esciMaster")
   .onclick = esciMaster;


}






// =====================================
// CAMBIO CAMPAGNA
// =====================================


function cambiaCampagna(nome){



    let dati = ottieniCampagna(nome);



    if(!dati)
    return;



    campagnaAttuale = dati;


    nomeCampagnaAttuale = nome;



    aggiornaInterfaccia();


}







// =====================================
// PESCA
// =====================================


function pesca(){



    if(!campagnaAttuale)
    return;



    let carta =

    pescaDalMazzo(

        campagnaAttuale.mazzo

    );



    if(!carta){


        alert(

        "Il mazzo è vuoto!"

        );


        return;


    }



    salvaCampagna(

        nomeCampagnaAttuale,

        campagnaAttuale

    );



    mostraCarta(carta);



}







// =====================================
// MOSTRA CARTA
// =====================================


function mostraCarta(nome){

    // Suono carta che gira

    let suonoCarta = new Audio(
    "suoni/carta.mp3"
    );

    suonoCarta.volume = 0.7;

   suonoCarta.play();


    let dati =

    ottieniCarta(nome);



    let immagine =

    document.getElementById(

        "immagineCarta"

    );



    immagine.classList.remove(

        "cartaPesca"

    );



    void immagine.offsetWidth;



    immagine.src =

    "immagini/" +

    dati.immagine;



    immagine.classList.add(

        "cartaPesca"

    );



    document
    .getElementById("nomeCarta")
    .innerHTML =

     nome;



    if(modalitaMaster){


     document
     .getElementById("descrizioneCarta")
     .innerHTML =
     dati.effetto;


    }

    else{


     document
     .getElementById("descrizioneCarta")
     .innerHTML =

     "Il destino ha scelto una carta..." ;


    }



    aggiornaCronologia();



}






// =====================================
// RESET
// =====================================


function reset(){



    if(

    confirm(

    "Vuoi davvero resettare il mazzo?"

    )

    ){



        campagnaAttuale.mazzo =

        resetMazzo();



        salvaCampagna(

        nomeCampagnaAttuale,

        campagnaAttuale

        );



        mostraRetro();



        aggiornaCronologia();



    }


}






// =====================================
// MOSTRA RETRO
// =====================================


function mostraRetro(){



    document

    .getElementById(

    "immagineCarta"

    )

    .src =

    "immagini/retro.png";



    document

    .getElementById(

    "nomeCarta"

    )

    .innerHTML =

    "Nessuna carta pescata";



    document

    .getElementById(

    "descrizioneCarta"

    )

    .innerHTML =

    "Premi Pesca per estrarre una carta.";


}






// =====================================
// NUOVA CAMPAGNA
// =====================================


function nuovaCampagna(){



    let nome =

    prompt(

    "Nome nuova campagna:"

    );



    if(!nome)
    return;



    if(

    creaCampagna(nome)

    ){


        caricaListaCampagne();


        cambiaCampagna(nome);


    }

    else{


        alert(

        "Esiste già una campagna con questo nome."

        );


    }


}







// =====================================
// ELIMINA CAMPAGNA
// =====================================


function elimina(){



    if(!nomeCampagnaAttuale)
    return;



    if(

    confirm(

    "Eliminare questa campagna?"

    )

    ){


        eliminaCampagna(

        nomeCampagnaAttuale

        );



        caricaListaCampagne();



        let lista = elencoCampagne();



        if(lista.length>0){


            cambiaCampagna(lista[0]);


        }


    }


}






// =====================================
// REINSERIMENTO CARTA
// =====================================


function reinserisci(){



    let nome =

    document

    .getElementById(

    "inputCarta"

    )

    .value;



    if(!nome)
    return;



    reinserisciNelMazzo(

    campagnaAttuale.mazzo,

    nome

    );



    salvaCampagna(

    nomeCampagnaAttuale,

    campagnaAttuale

    );



    alert(

    "Carta reinserita!"

    );


}







// =====================================
// LISTA CAMPAGNE
// =====================================


function caricaListaCampagne(){



    let select =

    document

    .getElementById(

    "listaCampagne"

    );



    select.innerHTML="";



    elencoCampagne()

    .forEach(

    nome => {


        let option =

        document.createElement(

        "option"

        );



        option.value = nome;


        option.textContent = nome;


        select.appendChild(option);


    });


}






// =====================================
// CRONOLOGIA
// =====================================


function aggiornaCronologia(){



    let lista =

    document

    .getElementById(

    "listaPescate"

    );



    lista.innerHTML="";



    if(!campagnaAttuale)
    return;



    campagnaAttuale

    .mazzo

    .cartePescate

    .forEach(

    carta => {



        let elemento =

        document.createElement(

        "li"

        );



        elemento.textContent =

        carta;



        lista.appendChild(

        elemento

        );


    });


}






// =====================================
// AGGIORNA INTERFACCIA
// =====================================


function aggiornaInterfaccia(){



    mostraRetro();


    aggiornaCronologia();


    document

    .getElementById(

    "listaCampagne"

    )

    .value =

    nomeCampagnaAttuale;


}
function entraMaster(){


let password = 
document.getElementById("passwordMaster").value;


if(password === PASSWORD_MASTER){


modalitaMaster = true;


document.getElementById("master")
.style.display="block";


document.getElementById("reset")
.style.display="inline-block";


document.getElementById("accessoMaster")
.style.display="none";


mostraDescrizione();


}
else{


document.getElementById("errorePassword")
.innerHTML =
"Password errata";


}


}




function esciMaster(){


modalitaMaster=false;


document.getElementById("master")
.style.display="none";


document.getElementById("reset")
.style.display="none";


document.getElementById("accessoMaster")
.style.display="block";


nascondiDescrizione();


}

function mostraDescrizione(){


let nome = 
document.getElementById("nomeCarta")
.innerText.replace("🎴 ","");


if(nome){

let carta =
ottieniCarta(nome);


document
.getElementById("descrizioneCarta")
.innerHTML =
carta.effetto;

}


}



function nascondiDescrizione(){


document
.getElementById("descrizioneCarta")
.innerHTML =

"Il destino ha scelto una carta...";


}