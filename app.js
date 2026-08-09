import {

    inizializzaSalvataggi,
    caricaSalvataggi,
    salvaDati,
    creaCampagna,
    eliminaCampagna,
    ottieniCampagna,
    salvaCampagna,
    elencoCampagne,
    ascoltaCampagna,
    ascoltaElencoCampagne

} from "./storageFirebase.js";

let modalitaMaster = false;

const PASSWORD_MASTER = "DM2026";

// =====================================
// VARIABILI GLOBALI
// =====================================


let campagnaAttuale = null;

let nomeCampagnaAttuale = null;

let timerCarta = null;

let pescaInCorso = false;


// =====================================
// AVVIO PROGRAMMA
// =====================================


window.onload = async function(){

    
   // await inizializzaSalvataggi();

    
    aggiornaCronologia();


    await caricaListaCampagne();

    
    let campagne = await elencoCampagne();
    console.log("ELENCO CAMPAGNE:", campagne);

    if(campagne.length > 0){

    await cambiaCampagna(campagne[0]);

}


    collegaPulsanti();

    ascoltaElencoCampagne(async ()=>{

    let selezionata = nomeCampagnaAttuale;

    await caricaListaCampagne();

    if(selezionata){

        document
        .getElementById("listaCampagne")
        .value = selezionata;

    }

});
    


};

// =====================================
// COLLEGAMENTO PULSANTI
// =====================================

function collegaPulsanti(){



  document
.getElementById("pesca")
.onclick = function(){

    

    pesca();

};


    document
    .getElementById("nuovaCampagna")
    .onclick = nuovaCampagna;



    document
    .getElementById("eliminaCampagna")
    .onclick = elimina;



    document
    .getElementById("reinserisci")
    .onclick = reinserisci;

    document
   .getElementById("rimuoviCarta")
   .onclick = rimuoviCarta;

    document
   .getElementById("entraMaster")
   .onclick = entraMaster;

    document
   .getElementById("esciMaster")
   .onclick = esciMaster;


    document
    .getElementById("resetMazzo")
    .onclick = reset;


    document
    .getElementById("listaCampagne")
    .onchange = function(){


        cambiaCampagna(this.value);


    };



  


}

// =====================================
// CAMBIO CAMPAGNA
// =====================================

async function cambiaCampagna(nome){


    let dati = await ottieniCampagna(nome);


    if(!dati)
    return;


    campagnaAttuale = dati;


    nomeCampagnaAttuale = nome;

    console.log("CAMPAGNA ATTIVA:", nomeCampagnaAttuale);


    aggiornaInterfaccia();



    ascoltaCampagna(

    nome,

    (aggiornamento)=>{

        campagnaAttuale = aggiornamento;

        aggiornaCronologia();

        if(campagnaAttuale.ultimaCarta){

            mostraCarta(
                campagnaAttuale.ultimaCarta
            );

        }
        else{

            mostraRetro();

        }

      }

    );

}

// =====================================
// PESCA
// =====================================

async function pesca(){

    pescaInCorso = false;
    document.getElementById("pesca").disabled = false;

   
    if(pescaInCorso)
    return;


    pescaInCorso = true;


    if(!campagnaAttuale){

        pescaInCorso = false;
        return;

    }

    document.getElementById("pesca").disabled = true;


    let carta =

    pescaDalMazzo(

        campagnaAttuale.mazzo

    );
    
  
  
  aggiornaCronologia();


    if(!carta){


        document.getElementById("immagineCarta").src =
        "immagini/mazzo_vuoto.png";

        document.getElementById("nomeCarta").textContent =
        "Il mazzo è esaurito";

       document.getElementById("descrizioneCarta").textContent =
       "Nessun'altra carta può essere pescata.";

       pescaInCorso = false;

      return;


    }



   

    campagnaAttuale.ultimaCarta = carta;


  await salvaCampagna(

    nomeCampagnaAttuale,

    campagnaAttuale

  );


     mostraCarta(carta);
  
     setTimeout(()=>{

    pescaInCorso = false;

    document.getElementById("pesca").disabled = false;

},1200);

}

// =====================================
// MOSTRA CARTA
// =====================================

function mostraCarta(nome){

    let dati = ottieniCarta(nome);

    let immagine =
    document.getElementById("immagineCarta");

    //---------------------------------
    // Suono
    //---------------------------------

    let audio =
    new Audio("suoni/carta.mp3");

    audio.volume=0.7;

    audio.play();

    //---------------------------------
    // Mostra il retro
    //---------------------------------

    immagine.src="immagini/retro.png";

    immagine.classList.remove("cartaPesca");

    void immagine.offsetWidth;

    immagine.classList.add("cartaPesca");

    //---------------------------------
    // Dopo un secondo gira
    //---------------------------------


    if(timerCarta){

    clearTimeout(timerCarta);

    }

    timerCarta = setTimeout(()=>{

        immagine.src=
        "immagini/"+dati.immagine;

        document
        .getElementById("nomeCarta")
        .innerHTML=nome;

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
          "Il destino ha scelto una carta...";


        }

    },1000);

}

// =====================================
// RESET
// =====================================

async function reset(){



    if(

    confirm(

    "Vuoi davvero resettare il mazzo?"

    )

    ){

       // Suono carte che si mischiano

      let suonoMischio = new Audio(
          "suoni/carte_mischiano.mp3"
       );

      suonoMischio.volume = 0.8;

      suonoMischio.play();

        campagnaAttuale.mazzo = resetMazzo();

        campagnaAttuale.ultimaCarta = null;
        
        await salvaCampagna(

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

    if(timerCarta){

    clearTimeout(timerCarta);

    }   

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


async function nuovaCampagna(){



    let nome =

    prompt(

    "Nome nuova campagna:"

    );



    if(!nome)
    return;



    let creata =

    await creaCampagna(nome);



    if(creata){


        await caricaListaCampagne();


        await cambiaCampagna(nome);


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

async function elimina(){



    if(!nomeCampagnaAttuale)

    return;



    if(

    confirm(

    "Eliminare questa campagna?"

    )

    ){


        await eliminaCampagna(

            nomeCampagnaAttuale

        );



        await caricaListaCampagne();



        let lista =

        await elencoCampagne();



        if(lista.length > 0){


            await cambiaCampagna(lista[0]);


        }


    }


}

// =====================================
// REINSERIMENTO CARTA
// =====================================

function reinserisci(){


    let input = document
    .getElementById("inputCarta");


    let nome = input.value.trim();



    if(!nome)
    return;



    if(!ottieniCarta(nome)){


        alert(
            "Carta non trovata nel mazzo."
        );


        return;


    }



    if(
        campagnaAttuale.mazzo.carteDisponibili.includes(nome)
    ){


        alert(
            "Questa carta è già nel mazzo."
        );


        return;


    }



    reinserisciNelMazzo(

        campagnaAttuale.mazzo,

        nome

    );



    salvaCampagna(

        nomeCampagnaAttuale,

        campagnaAttuale

    );



    input.value="";


    alert(

        "Carta reinserita correttamente!"

    );


}

// =====================================
// RIMOZIONE CARTA
// =====================================

async function rimuoviCarta(){

    let nome =

    document
    .getElementById("inputCarta")
    .value
    .trim();


    if(!nome)
    return;


    if(!campagnaAttuale)
    return;


    let rimossa =

    rimuoviDalMazzo(

        campagnaAttuale.mazzo,

        nome

    );


    if(!rimossa){

        alert(

            "Questa carta non è presente nel mazzo."

        );

        return;

    }


    await salvaCampagna(

        nomeCampagnaAttuale,

        campagnaAttuale

    );


    document
    .getElementById("inputCarta")
    .value = "";


    alert(

        "Carta rimossa dal mazzo!"

    );

}

// =====================================
// LISTA CAMPAGNE
// =====================================

async function caricaListaCampagne(){

    let select = document.getElementById("listaCampagne");

    select.innerHTML = "";

    let elenco = await elencoCampagne();

    

    elenco.forEach(nome => {

        let option = document.createElement("option");

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

    document.getElementById("listaPescate");


    lista.innerHTML="";


    if(!campagnaAttuale)
    return;


    if(!campagnaAttuale.mazzo.cartePescate)
    return;


        campagnaAttuale.mazzo.cartePescate.forEach(

        carta => {


            let elemento =
            document.createElement("li");


            elemento.textContent =
            carta;


            lista.appendChild(elemento);


        }

    );


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

            document.getElementById("accessoMaster")
            .style.display="none";


            document.getElementById("master")
            .style.display="block";


            document.getElementById("resetMazzo")
            .style.display="inline-block";


            mostraDescrizione();


}
else{


document.getElementById("errorePassword")
.innerHTML =
"Password errata";


}


}


function esciMaster(){

   // Nasconde area Master

    document
    .getElementById("master")
    .style.display="none";

    // Riappare accesso

    document
    .getElementById("accessoMaster")
    .style.display="block";

    // Cancella password

    document
    .getElementById("passwordMaster")
    .value="";

    // Cancella messaggio errore

    document
    .getElementById("errorePassword")
    .innerHTML="";

    // Nasconde descrizione

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