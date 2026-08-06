// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Firebase Realtime Database
import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// Configurazione Firebase

const firebaseConfig = {

    apiKey: "AIzaSyB4sCmXBJzAgiIU9BhzGb2t6NDk6S_SI3A",

    authDomain: "mazzo-delle-meraviglie-274bd.firebaseapp.com",

    databaseURL: "https://mazzo-delle-meraviglie-274bd-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "mazzo-delle-meraviglie-274bd",

    storageBucket: "mazzo-delle-meraviglie-274bd.firebasestorage.app",

    messagingSenderId: "418443809223",

    appId: "1:418443809223:web:d2fbd7947e3a53a34149e2"

};


// Avvio Firebase

const app = initializeApp(firebaseConfig);


// Connessione al Realtime Database

const database = getDatabase(app);


// Esporta il database

export { database };