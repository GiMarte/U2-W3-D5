/* 
🛍️CRUDAZON

Stai creando la parte front-end di uno shop online. In particolare sarai responsabile della creazione di un back-office, dove gli amministratori possono aggiungere e modificare i prodotti.

L’obiettivo di oggi è connettere un’interfaccia statica alle API per poter ricevere prodotti, crearne di nuovi, modificarli una volta creati e cancellarli all’occorrenza.

Questo è l’endpoint principale:

https://striveschool-api.herokuapp.com/api/product/1plain

Questo è il modello di un prodotto:
{
"name" : "Nokia 3310",
"description" : "bla bla"
"brand" : "nokia",
"imageUrl" : "hhtps bla bla"
"price" : "33"
}
 Select an Image

Per creare nuovi prodotti dovrai partire da questo modello come riferimento, e formarlo con alcune delle proprietà richieste per poi inviarlo come payload della chiamata POST.

OGNI CHIAMATA DOVRÀ ESSERE AUTENTICATA! L’autenticazione di queste API è una “Token Based Authentication” per rendere privato l’accesso ai suoi contenuti. Senza essere autenticato non potrai ottenere i dati di cui hai bisogno.

Per prima cosa dovrai recuperare un tuo token personale registrandoti su: https://strive.school/studentlogin

Il token dovrà venire utilizzato come "authorization" header.

Obiettivi generali:

Avere una pagina back-office, in cui si potranno inserire i prodotti specificando i parametri obbligatori e facoltativi,  modificare o cancellare il prodotto.Una homepage, dove l’utente possa vedere i prodotti disponibiliUna pagina di dettaglio in cui visualizzare tutti i dettagli del prodotto.

Tasks:

In Backoffice: usa una POST su /product con un payload per creare una nuova risorsa.In Backoffice: aggiungi un bottone per la funzionalità di modifica di un prodotto già creato in precedenza (usa una PUT su /product/[PRODUCT_ID]).In Backoffice: aggiungi un bottone per la cancellazione di uno specifico prodotto già esistente (usa DELETE su /product/[PRODUCT_ID])In Backoffice: aggiungi una validazione di base per la creazione/modifica del prodotto nel form (non permettere l'invio dei dati con campi vuoti)In Backoffice: aggiungi un bottone “Reset” per resettare il form.In Homepage:
premendo un bottone “modifica” su un prodotto si dovrà poterlo modificare.Pagina Dettaglio:
A questa pagina ci si arriverà cliccando sulla card in homepage.

EXTRA:

In Backoffice: I bottoni “reset” e “delete” dovranno chiedere conferma prima di procedere con l’operazione.In Homepage: aggiungi un indicatore di caricamento affianco al titolo principale della pagina durante il caricamento delle risorse.Crea un sistema di gestione degli errori. Mostra all’utente un messaggio di errore specifico per le varie tipologie di problema, quando qualcosa va storto, attraverso l’utilizzo di componenti di Bootstrap appropriati.

FAQ:

“Nelle mie API non c’è niente, come mai?”

All'inizio ognuno di voi partirà con array di prodotti vuoto, createne qualcuno prima!😊

“Ricevo un errore con 500, c’è qualcosa che non va lato server?”

Molto probabilmente no, controlla sul tab Network che la tua richiesta contenga tutti i campi richiesti, con le chiavi corrette, e che sia inviata in formato JSON. La preview della risposta dal server spesso ti dice cosa c’è che non va.Di solito:

Manca un campo obbligatorioHai una “duplicate key”, che significa che qualcosa con lo stesso valore esiste già.Stai inviando il tipo di dato sbagliato (es. una stringa invece di un numero sul campo “price”)

Imparare a leggere gli errori è molto importante, sono i tuoi migliori amici!
*/
const url = "https://striveschool-api.herokuapp.com/api/product";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik";
const params = new URLSearchParams(window.location.search).get("id");

if (params) {
  fetch(`${url}/${params}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((arr) => {
      console.log(arr);
      document.getElementById("name").value = arr.name;
      document.getElementById("description").value = arr.description;
      document.getElementById("brand").value = arr.brand;
      document.getElementById("img-url").value = arr.imageUrl;
      document.getElementById("price").value = arr.price;
    })
    .catch((err) => {
      console.log("siamo nell catch", err);
    });
}

const form = document.getElementById("back-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("img-url").value;
  const price = document.getElementById("price").value;
  if (params) {
    updateData(name, description, brand, imageUrl, price);
  } else {
    sendData(name, description, brand, imageUrl, price);
  }

  form.reset();
});

const sendData = function (name, description, brand, imageUrl, price) {
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
      brand: brand,
      imageUrl: imageUrl,
      price: price,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return console.log(res);
    })
    .catch((err) => {
      "male male, errore:", err;
    });
};

const updateData = function (name, description, brand, imageUrl, price) {
  fetch(`${url}/${params}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
      brand: brand,
      imageUrl: imageUrl,
      price: price,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .catch((err) => {
      console.log("non sono riuscito a uploadare:", err);
    });
};

const resetForm = function () {
  form.reset();
};

const deleteItem = function ( ) {
    
}