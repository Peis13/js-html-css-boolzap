$(document).ready(
  function() {

    // -------------------------- LOGICA -------------------------- //

                            // ----- Intestazione ----- //

    /////////////// Icone menù attivazione
    // Al click di un elemento del menù-intestazione
    //  --> aggiungigli la classe 'active' e rimuovila agli altri
    $('.elemento-menu').click(
      function() {
        $('.elemento-menu.active').removeClass('active');
        $(this).addClass('active');
      }
    );

                        // ----- Fine Intestazione ----- //

                        // ----- Ricerca contatti ----- //

    /////////////// Filtro ricerca
    // Dopo che ho premuto un tasto sulla tastiera, succede l'evento
    // che va a ciclare i miei contatti uno ad uno (each)
    // a questo punto confronto il testo scritto nell'input di ricerca con il nome-contatto
    // se la stringa digitata 'contattoCercato' è inclusa nella stringa 'nomeContatto'
    //  --> visualizza il contatto ($(this))
    //  --> altrimenti nascondilo
    $('.ricerca-contatti .ricerca').keyup(
      function(event) {
        var contattoCercato = $(this).val().toLowerCase();

        $('.lista-contatti .contatto').each(
          function() {
            var nomeContatto = $(this).find('.nome-contatto').text().toLowerCase();

            if (nomeContatto.includes(contattoCercato)) {
              $(this).show();
            } else {
              $(this).hide();
            }
          }
        );
      }
    );

    /////////////// Focus input ricerca
    // Quando entro nel focus dell'input di ricerca
    //  --> aggiungi la classe 'active'
    $(document).on('focus', '.ricerca',
      function() {
        $(this).parent().addClass('active');
      }
    );

    /////////////// Blur input ricerca
    // Quando l'utente esce dal focus dell'input
    //  --> rimuovi la classe 'active'
    $(document).on('blur', '.ricerca',
      function() {
        $(this).parent().removeClass('active');
      }
    );

                        // ----- Fine Ricerca contatti ----- //

                        // ----- Mostra chat ----- //

    // Quando clicco sul contatto nella lista dei contatti
    //  --> mostra la chat corrispondente a quel contatto
    //  --> cambia il contatto nell'intestazione-chat
    //  --> rendo attivo il contatto

    /////////////// v.1: con index() + eq()
    //  --> focalizzo l'indice di posizionamento del contatto nella lista cliccato
    //  --> e vado a compararlo con l'indice di posizionamento delle chat
    $(document).on('click','.lista-contatti .contatto',
      function() {

        // attivo/disattivo il contatto
        $('.lista-contatti .contatto.active').removeClass('active');
        $(this).addClass('active');

        svuotaRicerca();
        cambiaDestinatario(this);

        var indiceContatto = $(this).index();
        $('.finestra-chat .chat.active').removeClass('active');
        var chatContatto = $('.finestra-chat .chat').eq(indiceContatto).addClass('active');
        scrollaGiu(chatContatto);
      }
    );
    /////////////// fine v.1: con index() + eq()

    /////////////// v.2: leggendo l'attributo
    //  --> leggo l'attributo del contatto cliccato 'data-contact'
    //  --> e vado a compararlo con ogni attributo 'data-chat' delle singole chat
    // $(document).on('click','.lista-contatti .contatto',
    //   function() {
    //
    //     // attivo/disattivo il contatto
    //     $('.lista-contatti .contatto.active').removeClass('active');
    //     $(this).addClass('active');
    //
    //     svuotaRicerca();
    //     cambiaDestinatario(this);
    //
    //     var indiceContatto = $(this).attr('data-contact');
    //     $('.finestra-chat .chat.active').removeClass('active');
    //
    //     $('.finestra-chat .chat').each(
    //       function() {
    //         if ($(this).attr('data-chat') == indiceContatto) {
    //           $(this).addClass('active');
    //           var chatContatto = $(this);
    //           scrollaGiu(chatContatto);
    //         }
    //       }
    //     );
    //   }
    // );
    /////////////// fine v.2: leggendo l'attributo

    /////////////// v.3: associando l'attributo
    //  --> leggo l'attributo del contatto cliccato 'data-contact'
    //  --> e col suo valore vado a cercre l'attributo 'data-chat' della chat corrispondente
    // $(document).on('click','.lista-contatti .contatto',
    //   function() {
    //
    //     // attivo/disattivo il contatto
    //     $('.lista-contatti .contatto.active').removeClass('active');
    //     $(this).addClass('active');
    //
    //     svuotaRicerca();
    //     cambiaDestinatario(this);
    //
    //     var dataContact = $(this).attr('data-contact');
    //     var selettoreChat = '.finestra-chat .chat[data-chat="' + dataContact + '"]';
    //     var chatCorrispondente = $(selettoreChat);
    //     $('.finestra-chat .chat.active').removeClass('active');
    //     $(chatCorrispondente).addClass('active');
    //     scrollaGiu(chatCorrispondente);
    //   }
    // );
    /////////////// fine v.3: associando l'attributo

                        // ----- Fine Mostra chat ----- //

                        // ----- Crea contatto ----- //

    /////////////// Tasto aggiungi
    // Al click sul tasto aggiungi-contatto
    //  --> aggiungi/rimuovi la classe visibile alla finestra-aggiungi
    $('#aggiungi').click(
      function() {
        $('.finestra-aggiungi').toggleClass('visibile');
      }
    );

    /////////////// Chiudi finestra-aggiungi
    // Al click sul tasto chiudi
    //  --> rimuovi la classe visibile alla finestra-aggiungi
    $('.btn-chiudi').click(
      function() {
        $('.finestra-aggiungi').removeClass('visibile');
      }
    );

    /////////////// Seleziona immagine profilo
    // Al click sull'immagine
    //  --> aggiungile la classe 'selezionata'
    //  --> rimuovila alle altre
    $('.input .immagini-profilo img').click(
      function() {
        $('.input .immagini-profilo img.selezionata').removeClass('selezionata');
        $(this).addClass('selezionata');
      }
    );

    /////////////// Crea contatto
    // Al click sul bottone aggiungi
    //  --> leggi il valore inserito nell'input inserisci-nome
    //  --> leggi l'attributo 'src' dell'immagine selezionata
    //  --> aggiungi i valori al template contatto
    //  --> clona la chat per il nuovo contatto
    //  --> chiudi finestra-aggiungi contatto
    //  --> aggiungi il nuovo contatto alla lista-contatti
    $('.btn-aggiungi').click(
      function() {
        var nuovoNome = $('.input .inserisci-nome').val();
        var nuovoAvatar = $('.input .immagini-profilo img.selezionata').attr('src');

        // clona ed edita
        var nuovoContatto = clonaContatto(nuovoNome, nuovoAvatar);
        var nuovaChat = clonaChat();

        // chiudo la finestra
        // azzera il valore input nome-contatto
        // rimuovi la classe img.selezionata e aggiungila alla prima della lista
        $('.finestra-aggiungi').removeClass('visibile');
        $('.input .inserisci-nome').val('');
        $('.input .immagini-profilo img.selezionata').removeClass('selezionata');
        $('.input .immagini-profilo img').eq(0).addClass('selezionata');

        // aggiungi contatto alla lista-contatti
        var listaContatti = $('#lista-contatti');
        listaContatti.children('.contatto').removeClass('active');
        listaContatti.append(nuovoContatto);

        // aggiungi chat alla lista delle chat
        var listaChat = $('#finestra-chat');
        listaChat.children('.chat').removeClass('active');
        listaChat.append(nuovaChat);

        // cambia destinatario e scrolla giù
        cambiaDestinatario(nuovoContatto)
        scrollaGiu(listaContatti);
      }
    );

                        // ----- Fine Crea contatto ----- //

                        // ----- Messaggistica ----- //

    /////////////// Focus input messaggio
    // Quando l'utente entra nel focus dell'input messaggio
    //  --> il microfono sparisce e appare il tasto di 'invio-messaggio'
    $(document).on('focus', '.toolbar input',
      function() {
        $('.invio-audio').removeClass('active');
        $('.invio-messaggio').addClass('active');
      }
    );

    /////////////// Blur input messaggio
    // Quando l'utente non è più nel focus dell'input messaggio
    //  --> il tasto di 'invio-messaggio' sparisce e appare il microfono
    //      solo se l'input-messaggio è vuoto
    $(document).on('blur', '.toolbar input',
      function() {
        var testoMessaggio = $('.toolbar input').val();

        // Esegui la funzione solo se il valore dell'input è vuoto
        if (testoMessaggio == '') {
          $('.invio-messaggio').removeClass('active');
          $('.invio-audio').addClass('active');
        }
      }
    );

    /////////////// Aggiunta di un messaggio (click)
    // L’utente scrive un testo nella parte bassa (input) e cliccando “invia”
    // il testo viene aggiunto al thread sopra, come messaggio verde
    // cambia l'icona dopo l'invio del messaggio
    $(document).on('click', '.invio-messaggio',
      function() {
        var messaggio = inviaMessaggio();

        // se il l'input messaggio non è vuoto
        //  --> genera una risposta
        //  --> altrimenti non rispondere
        if (messaggio != '') {
          risposta('ok');
          $('.invio-messaggio').removeClass('active');
          $('.invio-audio').addClass('active');
        }
      }
    );

    /////////////// Aggiunta di un messaggio (tastiera)
    // L’utente scrive un testo nella parte bassa (input)
    // e cliccando il tasto 'invio' della tastiera
    // il testo viene aggiunto al thread sopra, come messaggio verde
    $(document).on('keypress','.toolbar input',
      function(event) {
        if ((event.which === 13) || (event.keyCode === 13)) {
          var messaggio = inviaMessaggio();

          // se il l'input messaggio non è vuoto
          //  --> genera una risposta
          //  --> altrimenti non rispondere
          if (messaggio != '') {
            risposta('ok');
          }
        }
      }
    );

    /////////////// Menù a tendina
    // Cliccando sulla 'freccia-opzioni' del messaggio
    //  --> appare un menu a tendina
    //      --> cerco tutti i menù a tendina della chat percorrendo il DOM e li nascondo
    //      --> rendo visibile il menù a tendina cliccato e rendo statica la 'freccia-opzioni'
    $(document).on('click', '.messaggio .opzioni-messaggio',
      function() {

        // forma esplicita
        // $(this).parent().siblings().children('.opzioni-messaggio').removeClass('statico').find('.dropdown').removeClass('visibile');

        var messaggiFratelli = $(this).parent().siblings();
        var opzioniMessaggio = messaggiFratelli.children('.opzioni-messaggio').removeClass('statico');
        var menuTendina = opzioniMessaggio.find('.dropdown').removeClass('visibile');

        // Controllo lo stato del menù a tendina
        // se il menù è aperto
        //  --> la freccia delle 'opzioni-messaggio' non è più statica
        //  --> altrimenti la freccia rimane statica
        if ($(this).children('.dropdown').hasClass('visibile')) {
          var opzioniCorrente = $(this).removeClass('statico');
          opzioniCorrente.children('.dropdown').toggleClass('visibile');

        } else {
          var opzioniCorrente = $(this).addClass('statico');
          opzioniCorrente.children('.dropdown').toggleClass('visibile');
        }
      }
    );

    /////////////// Cancella messaggio
    // Cliccando sull'opzione 'cancella-messaggio' del menù a tendina
    //  --> possiamo cancellare il messaggio selezionato
    $(document).on('click', '.cancella-messaggio',
      function() {
        $(this).parents('.messaggio').remove();
      }
    );

                        // ----- Fine Messaggistica ----- //

                        // ----- Modalità notte ----- //

    /////////////// Modalità notte
    // Al click sul tasto 'modalita-notte'
    // modifica i colori dei vari elementi
    $(document).on('click', '.modalita-notte',
      function() {
        $('.wrapper-gradient').toggleClass('notte');
      }
    );

                        // ----- Fine Modalità notte ----- //

    // -------------------------- FINE LOGICA -------------------------- //

    // -------------------------- FUNZIONI -------------------------- //

    /////////////// Invia Messaggio
    // Invia un messaggio di testo nella chat corrente
    // esegue le istruzioni solo se il messaggio inserito non è vuoto
    //  --> clona il template 'messaggio'
    //  --> modifica il testo del paragrafo 'testo-messaggio' dell'elemento clonato
    //  --> aggiunge l'orario corrente
    //  --> assegna la classe 'inviato' al clone del messaggio e appende il tutto nella chat
    //  --> 'scrolla' in basso la chat fino all'ultimo messaggio appena inviato
    //  --> infine cancella il testo scritto nell'input dall'utente
    // return: stringa del testo messaggio (se inserito)
    function inviaMessaggio() {
      var testoMessaggio = $('.toolbar input').val();

      // Esegui la funzione solo se il valore dell'input non è vuoto
      if (testoMessaggio != '') {

        // clona ed edita
        var messaggio = clonaMessaggio(testoMessaggio);
        messaggio.addClass('inviato');

        // aggiungi messaggio alla chat
        var chatCorrente = $('#finestra-chat .chat.active');
        chatCorrente.append(messaggio);

        // aggiungi messaggio al contatto nella lista-contatti e scrolla giù
        var contattoAttivo = '.contatto.active';
        ultimoMessaggio(chatCorrente, contattoAttivo);
        scrollaGiu(chatCorrente);

        // reset
        $('.toolbar input').val('');
      }
      return testoMessaggio;
    }

    /////////////// Risposta
    // Risposta dall’interlocutore: ad ogni inserimento di un messaggio
    // l’utente riceverà un “ok” come risposta, che apparirà dopo 3 secondi totali
    // Genera una risposta (passandogliela per argomento) dopo un tempo definito
    // nel frattempo, dopo un secondo dall'invio del 'messaggio-inviato',
    // nelle info-contatto appare la scritta 'Sto scrivendo...' con delay 1 secondo
    function risposta(testo) {

      setTimeout(function() {
        $('#destinatario .info-contatto').text('Sta scrivendo...');
      }, 1000);

      setTimeout(function() {

        // clona ed edita
        var messaggio = clonaMessaggio(testo);

        // aggiungi messaggio alla chat
        var chatCorrente = $('#finestra-chat .chat.active');
        chatCorrente.append(messaggio);

        // aggiungi messaggio al contatto nella lista-contatti e scrolla giù
        var contattoAttivo = '.contatto.active';
        ultimoMessaggio(chatCorrente, contattoAttivo);
        scrollaGiu(chatCorrente);
        $('#destinatario .info-contatto').text('Online');
      }, 3000);
    }

    /////////////// Ultimo messaggio
    // Prende l'ultimo messaggio ricevuto
    // e lo copia alle credenziali del contatto nella lista-contatti
    // cambiando anche l'orario di ricezione del messaggio
    function ultimoMessaggio(chat, contatto) {
      var ultimoMessaggio = $(chat).find('.messaggio:last-child .testo-messaggio').text();
      $('#lista-contatti ' + contatto + ' .ultimo-messaggio').text(ultimoMessaggio);
      $('#lista-contatti ' + contatto + ' .orario').text(oraCorrente());
    }

    /////////////// Clona Messaggio
    // Clona il template del messaggio
    // editando il testo del messaggio e l'ora corrente
    // return: nuovo messaggio editato
    function clonaMessaggio(testo) {
      var messaggio = $('.template .messaggio').clone();
      messaggio.children('.testo-messaggio').text(testo);
      messaggio.children('.orario').prepend(oraCorrente());
      return messaggio;
    }

    /////////////// Clona Contatto
    // Clona il template del contatto
    // editando il nome del contatto e l'immagine profilo
    // infine aggiungi l'orario corrente
    // return: nuovo contatto editato
    function clonaContatto(nuovoNome, nuovoAvatar) {
      var nuovoContatto = $('.template .contatto').clone();
      nuovoContatto.find('.nome-contatto').text(nuovoNome);
      nuovoContatto.find('.avatar img').attr('src', nuovoAvatar);
      nuovoContatto.find('.orario').text(oraCorrente());
      nuovoContatto.addClass('active');
      return nuovoContatto;
    }

    /////////////// Clona Chat
    // Clona il template della chat
    // e appendila alla lista delle chat
    // return: nuova chat
    function clonaChat() {
      var nuovaChat = $('.template .chat').clone();
      nuovaChat.addClass('active');
      return nuovaChat;
    }

    /////////////// Cambia Destinatario
    // Cambia destinatario visualizzato nell'intestazione-chat
    // Leggo immagine e nome relativi al contatto della lista-contatti
    // che andrò a sostituire al contatto nell'intestazione-chat del destinatario
    function cambiaDestinatario(contatto) {
      var avatarContatto = $(contatto).find('img').attr('src');
      var nomeContatto = $(contatto).find('.nome-contatto').text();
      var avatarDestinatario = $('#destinatario').find('img').attr('src', avatarContatto);
      var nomeDestinatario = $('#destinatario').find('.nome-contatto').text(nomeContatto);
    }

    /////////////// Svuota Ricerca
    // Svuoto la barra di ricerca contatti
    // e una volta selezionato il contatto
    // li rendo tutti visibili
    function svuotaRicerca() {
      $('.ricerca-contatti .ricerca').val('');
      $('.lista-contatti .contatto').show();
    }

    /////////////// Ora Corrente
    // Funzione che genera l'ora corrente
    //  --> prendo ora e minuti giornalieri correnti
    //  --> li concateno assegnandoli a una variabile di ritorno
    // return: numero che identifica l'orario corrente
    function oraCorrente() {
      var date = new Date();
      var oraCorrente = date.getHours();
      var minutiCorrenti = date.getMinutes();
      var orarioCorrente = aggiungiZeroAlNumero(oraCorrente) + ':' + aggiungiZeroAlNumero(minutiCorrenti);
      return orarioCorrente;
    }

    /////////////// Aggiungi Zero al Numero
    // Funzione che aggiunge uno zero davanti al numero
    // solo se è inferiore a 10
    // return: numero modificato
    function aggiungiZeroAlNumero(numero) {
      if (numero < 10) {
        return '0' + numero;
      }
      return numero;
    }

    /////////////// Scrolla Giù
    // Scrolla la pagina corrente alla base della sua altezza
    function scrollaGiu(finestra) {
      finestra.scrollTop(finestra.prop('scrollHeight'));
    }
  }
);

// -------------------------- FINE FUNZIONI -------------------------- //
