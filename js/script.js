$(document).ready(
  function() {

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
    // il testo viene aggiunto al thread sopra, come messaggio verde
    $('.invio-messaggio').click(
      function() {
        inviaMessaggio();
        risposta('ok');
      }
    );

    // Aggiunta di un messaggio:
    // l’utente scrive un testo nella parte bassa (input)
    // e cliccando il tasto 'invio' della tastiera
    // il testo viene aggiunto al thread sopra, come messaggio verde
    $('.toolbar input').keypress(
      function(event) {
        if ((event.which === 13) || (event.keyCode === 13)) {
          inviaMessaggio();
          risposta('ok');
        }
      }
    );

    // FUNZIONI //
    // Modifica il testo del paragrafo 'testo-messaggio' nel template html
    // successivamente clona il blocco html 'messaggio' e ci aggiunge la classe 'inviato'
    // infine cancella il testo scritto nell'input dall'utente
    function inviaMessaggio() {
      var testoMessaggio = $('.toolbar input').val();
      if (testoMessaggio != '') {

        var messaggio = $('.template .messaggio').clone();
        messaggio.find('.testo-messaggio').text(testoMessaggio);
        messaggio.addClass('inviato');

        // var date = new Date();
        // var oraCorrente = date.getHours();
        // var minutiCorrenti = date.getMinutes();
        // var orarioCorrente = aggiungiZeroAlNumero(oraCorrente) + ':' + aggiungiZeroAlNumero(minutiCorrenti);
        // nuovoMessaggio.children('.orario-messaggio').text(orarioCorrente);

        $('#chat .container').append(messaggio);
        // Scrolla alla fine della finestra
        console.log($('#chat .container').height());
        $('#chat .container').scrollTop($('#chat .container').height()); // TODO: aggiustare
        $('.toolbar input').val('');
      }
    }

    // Aggiunge uno zero davanti al numero se è inferiore a 10
    function aggiungiZeroAlNumero(numero) {
      if (numero < 10) {
        return '0' + numero;
      }
    }

    // Genera una risposta (passandogliela per argomento) dopo un tempo definito
    function risposta(testo) {
      setTimeout(function() {
        $('.template .messaggio .testo-messaggio').text(testo);
        var messaggio = $('.template .messaggio').clone();
        $('#chat .container').append(messaggio);
      }, 2000)
    }
  }
);
