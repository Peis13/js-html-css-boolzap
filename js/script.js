$(document).ready(
  function() {

    // -------------------------- LOGICA -------------------------- //
    // Appena il documento html è stato caricato del tutto
    // aggiungi l'orario corrente a tutti i messaggi presenti nella chat
    $('#finestra-chat .chat .messaggio').each(
      function() {
        $(this).children('.orario').prepend(oraCorrente());
      }
    );

    //////////////////// Messaggistica ////////////////////
    // Se l'utente inizia a scrivere un messaggio
    //  --> il microfono sparisce e appare il tasto di 'invio-messaggio'
    //  --> altrimenti non succede niente
    $(document).on('focus', '.toolbar input',
      function() {
        $('.invio-audio').removeClass('active');
        $('.invio-messaggio').addClass('active');
      }
    );

    // Aggiunta di un messaggio:
    // l’utente scrive un testo nella parte bassa (input) e cliccando “invia”
    //  --> il testo viene aggiunto al thread sopra, come messaggio verde
    // se il l'input messaggio è vuoto
    //  --> genera una risposta
    //  --> altrimenti non rispondere
    $('.invio-messaggio').click(
      function() {
        var messaggio = inviaMessaggio();
        if (messaggio != '') {
          risposta('ok');
        }
      }
    );

    // Aggiunta di un messaggio:
    // l’utente scrive un testo nella parte bassa (input)
    // e cliccando il tasto 'invio' della tastiera
    //  --> il testo viene aggiunto al thread sopra, come messaggio verde
    // se il l'input messaggio è vuoto
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
    //////////////////// Fine Messaggistica ////////////////////

    //////////////////// Ricerca contatti ////////////////////
    // Dopo che ho premuto un tasto sulla tastiera, succede l'evento
    // che va a ciclare i miei contatti uno ad uno (each)
    // a questo punto confronto il testo scritto nell'input di ricerca con il nome-contatto
    // se la stringa digitata 'contattoCercato' è inclusa nella stringa 'nomeContatto'
    //  --> visualizza il contatto $(this)
    //  --> altrimenti nascondilo
    $('.ricerca-contatti .ricerca').keyup(
      function(event) {

        $('.lista-contatti .contatto').each(
          function() {
            var contattoCercato = $('.ricerca-contatti .ricerca').val().toLowerCase();
            var nomeContatto = $(this).find('.nome-contatto').text();

            if (nomeContatto.toLowerCase().includes(contattoCercato)) {
              $(this).show();
            } else {
              $(this).hide();
            }
          }
        );
      }
    );
    //////////////////// Fine Ricerca contatti ////////////////////

    //////////////////// Mostra chat ////////////////////
    $('.lista-contatti .contatto').click(
      function() {
        var indiceContatto = $(this).index();
        $('.finestra-chat .chat.active').removeClass('active')
        var chatContatto = $('.finestra-chat .chat').eq(indiceContatto).addClass('active');
      }
    );
    //////////////////// Fine Mostra chat ////////////////////

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
        var messaggio = $('.template .messaggio').clone();
        messaggio.children('.testo-messaggio').text(testoMessaggio);
        messaggio.children('.orario').prepend(oraCorrente());
        messaggio.addClass('inviato');
        $('#finestra-chat .chat.active').append(messaggio);

        // Scrolla alla fine della finestra
        $('#finestra-chat .chat').scrollTop($('#finestra-chat .chat').height());
        $('.toolbar input').val('');
      }
      return testoMessaggio;
    }

    // Genera una risposta (passandogliela per argomento) dopo un tempo definito
    // Risposta dall’interlocutore: ad ogni inserimento di un messaggio,
    // l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo;
    function risposta(testo) {
      setTimeout(function() {

        var messaggio = $('.template .messaggio').clone();
        messaggio.children('.testo-messaggio').text(testo);
        messaggio.children('.orario').prepend(oraCorrente());
        $('#finestra-chat .chat.active').append(messaggio);

        // Scrolla alla fine della finestra
        $('#finestra-chat .chat').scrollTop($('#finestra-chat .chat').height());
      }, 2000);
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
  }
);
