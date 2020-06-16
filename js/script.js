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
        var testoMessaggio = $('.toolbar input').val();
        inviaMessaggio(testoMessaggio);
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
          var testoMessaggio = $('.toolbar input').val();
          inviaMessaggio(testoMessaggio);
          risposta('ok');
        }
      }
    );

    // FUNZIONI //
    // Modifica il testo del paragrafo 'testo-messaggio' nel template html
    // successivamente clona il blocco html 'messaggio' e ci aggiunge la classe 'inviato'
    // infine cancella il testo scritto nell'input dall'utente
    function inviaMessaggio(testo) {
      $('.template .messaggio .testo-messaggio').text(testo);
      var messaggio = $('.template .messaggio').clone();
      messaggio.addClass('inviato');
      $('#chat .container').append(messaggio);
      $('.toolbar input').val('');
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
