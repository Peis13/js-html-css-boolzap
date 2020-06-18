$(document).ready(
  function() {

    // -------------------------- LOGICA -------------------------- //
    /////////////// Assegna l'ora
    // Appena il documento html è stato caricato del tutto
    // aggiungi l'orario corrente a tutti i messaggi presenti nella chat
    $('#finestra-chat .chat .messaggio').each(
      function() {
        $(this).children('.orario').prepend(oraCorrente());
      }
    );
    /////////////// Fine Assegna l'ora

                        // ----- Intestazione ----- //

    /////////////// Icone menù attivazione
    // Al click di un elemento del menù-intestazione
    // aggiungigli la classe 'active' e rimuovila agli altri
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
    //  --> visualizza il contatto $(this)
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
    // aggiungi la classe 'active'
    $(document).on('focus', '.ricerca',
      function() {
        $(this).parent().addClass('active');
      }
    );

    /////////////// Blur input ricerca
    // Quando l'utente esce dal focus dell'input
    // rimuovi la classe 'active'
    $(document).on('blur', '.ricerca',
      function() {
        $(this).parent().removeClass('active'); // TODO: lasciare la freccia di invio messaggio se input.val() != ''
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
    // $('.lista-contatti .contatto').click(
    //   function() {
    //
    //     // attivo/disattivo il contatto
    //     $('.lista-contatti .contatto.active').removeClass('active');
    //     $(this).addClass('active');
    //
    //     var indiceContatto = $(this).index();
    //     $('.finestra-chat .chat.active').removeClass('active');
    //     var chatContatto = $('.finestra-chat .chat').eq(indiceContatto).addClass('active');
    //     scrollaGiu(chatContatto);
    //   }
    // );
    /////////////// fine v.1: con index() + eq()

    /////////////// v.2: leggendo l'attributo
    //  --> leggo l'attributo del contatto cliccato 'data-contact'
    //  --> e vado a compararlo con ogni attributo 'data-chat' delle singole chat
    // $('.lista-contatti .contatto').click(
    //   function() {
    //
    //     // attivo/disattivo il contatto
    //     $('.lista-contatti .contatto.active').removeClass('active');
    //     $(this).addClass('active');
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
    $('.lista-contatti .contatto').click(
      function() {

        // attivo/disattivo il contatto
        $('.lista-contatti .contatto.active').removeClass('active');
        $(this).addClass('active');
        var avatarContatto = $(this).find('img').attr('src');
        var nomeContatto = $(this).find('.nome-contatto').text();
        console.log(avatarContatto);
        console.log(nomeContatto);
        var avatarDestinatario = $('#destinatario').find('img').attr('src', avatarContatto);
        var nomeDestinatario = $('#destinatario').find('.nome-contatto').text(nomeContatto);

        var dataContact = $(this).attr('data-contact');
        var selettoreChat = '.finestra-chat .chat[data-chat="' + dataContact + '"]';
        var chatCorrispondente = $(selettoreChat);
        $('.finestra-chat .chat.active').removeClass('active');
        $(chatCorrispondente).addClass('active');
        scrollaGiu(chatCorrispondente);
      }
    );
    /////////////// fine v.3: associando l'attributo

                        // ----- Fine Mostra chat ----- //

                        // ----- Messaggistica ----- //

    /////////////// Focus input messaggio
    // Quando l'utente entra nel focus dell'input messaggio
    // il microfono sparisce e appare il tasto di 'invio-messaggio'
    $(document).on('focus', '.toolbar input',
      function() {
        $('.invio-audio').removeClass('active');
        $('.invio-messaggio').addClass('active');
      }
    );

    /////////////// Blur input messaggio
    // Quando l'utente non è più nel focus dell'input messaggio
    // il tasto di 'invio-messaggio' sparisce e appare il microfono
    $(document).on('blur', '.toolbar input',
      function() {
        var testoMessaggio = $('.toolbar input').val();

        // Esegui la funzione solo se il valore dell'input non è vuoto
        if (testoMessaggio == '') {
          $('.invio-messaggio').removeClass('active');
          $('.invio-audio').addClass('active');
        }
      }
    );

    /////////////// Aggiunta di un messaggio
    // L’utente scrive un testo nella parte bassa (input) e cliccando “invia”
    // il testo viene aggiunto al thread sopra, come messaggio verde
    // cambia l'icona dopo l'invio del messaggio
    // se il l'input messaggio non è vuoto
    //  --> genera una risposta
    //  --> altrimenti non rispondere
    $('.invio-messaggio').click(
      function() {
        var messaggio = inviaMessaggio();
        if (messaggio != '') {
          risposta('ok');
          $('.invio-messaggio').removeClass('active');
          $('.invio-audio').addClass('active');
        }
      }
    );

    /////////////// Aggiunta di un messaggio
    // L’utente scrive un testo nella parte bassa (input)
    // e cliccando il tasto 'invio' della tastiera
    // il testo viene aggiunto al thread sopra, come messaggio verde
    // se il l'input messaggio non è vuoto
    //  --> genera una risposta
    //  --> altrimenti non rispondere
    $('.toolbar input').keypress(
      function(event) {
        if ((event.which === 13) || (event.keyCode === 13)) {
          var messaggio = inviaMessaggio();
          if (messaggio != '') {
            risposta('ok');
          }
        }
      }
    );

    /////////////// Menù a tendina
    // Cliccando sulla 'freccia-opzioni' del messaggio appare un menu a tendina
    //  --> cerco tutti i menù a tendina della chat percorrendo il DOM e li nascondo
    //  --> rendo visibile il menù a tendina cliccato e rendo statica la 'freccia-opzioni'
    $(document).on('click', '.messaggio .opzioni-messaggio',
      function() {

        // forma esplicita
        // $(this).parent().siblings().children('.opzioni-messaggio').removeClass('statico').find('.dropdown').removeClass('visibile');

        var tuttiMessaggi = $(this).parent().siblings();
        var opzioniMessaggio = tuttiMessaggi.children('.opzioni-messaggio').removeClass('statico');
        var menuTendina = opzioniMessaggio.find('.dropdown').removeClass('visibile');

        // Controllo lo stato del menù a tendina
        // se il menù è aperto
        //  --> la freccia delle 'opzioni-messaggio' diventa statica
        //  --> altrimenti la freccia non rimane statica
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
    // possiamo cancellare il messaggio selezionato
    $(document).on('click', '.cancella-messaggio',
      function() {
        $(this).parents('.messaggio').remove();
      }
    );


                        // ----- Fine Messaggistica ----- //

    // -------------------------- FINE LOGICA -------------------------- //

    // -------------------------- FUNZIONI -------------------------- //
    // Invia un messaggio di testo nella chat corrente
    // return: stringa del testo messaggio (se inserito)
    // esegue le istruzioni solo se il messaggio inserito non è vuoto
    //  --> clona il blocco html 'messaggio'
    //  --> modifica il testo del paragrafo 'testo-messaggio' dell'elemento clonato
    //  --> aggiunge l'orario corrente
    //  --> assegna la classe 'inviato' al clone del messaggio e appende il tutto nella chat
    //  --> 'scrolla' in basso la chat fino all'ultimo messaggio appena inviato
    //  --> infine cancella il testo scritto nell'input dall'utente
    function inviaMessaggio() {
      var testoMessaggio = $('.toolbar input').val();

      // Esegui la funzione solo se il valore dell'input non è vuoto
      if (testoMessaggio != '') {

        // clona ed edita
        var messaggio = $('.template .messaggio').clone();
        messaggio.children('.testo-messaggio').text(testoMessaggio);
        messaggio.children('.orario').prepend(oraCorrente());
        messaggio.addClass('inviato');

        // aggiungi messaggio e scrolla giù
        var chatCorrente = $('#finestra-chat .chat.active');
        chatCorrente.append(messaggio);
        scrollaGiu(chatCorrente);

        // reset
        $('.toolbar input').val('');
      }
      return testoMessaggio;
    }

    // Genera una risposta (passandogliela per argomento) dopo un tempo definito
    // Risposta dall’interlocutore: ad ogni inserimento di un messaggio,
    // l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo;
    function risposta(testo) {
      setTimeout(function() {

        // clona ed edita
        var messaggio = $('.template .messaggio').clone();
        messaggio.children('.testo-messaggio').text(testo);
        messaggio.children('.orario').prepend(oraCorrente());

        // aggiungi messaggio e scrolla giù
        var chatCorrente = $('#finestra-chat .chat.active');
        chatCorrente.append(messaggio);
        scrollaGiu(chatCorrente)
      }, 500);
    }

    // Funzione che genera l'ora corrente
    // return: numero che identifica l'orario corrente
    //  --> prendo ora e minuti giornalieri correnti
    //  --> li concateno assegnandoli a una variabile di ritorno
    function oraCorrente() {
      var date = new Date();
      var oraCorrente = date.getHours();
      var minutiCorrenti = date.getMinutes();
      var orarioCorrente = aggiungiZeroAlNumero(oraCorrente) + ':' + aggiungiZeroAlNumero(minutiCorrenti);
      return orarioCorrente;
    }

    // Funzione che aggiunge uno zero davanti al numero se è inferiore a 10
    function aggiungiZeroAlNumero(numero) {
      if (numero < 10) {
        return '0' + numero;
      }
      return numero;
    }

    // Scrolla la pagina corrente alla base della sua altezza
    function scrollaGiu(finestra) {
      finestra.scrollTop(finestra.height());
    }
  }
);
