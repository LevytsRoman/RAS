$(document).ready(function(){

  $('.my_form').submit(function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $(this).hide();
    $('#msform').show();
    $.ajax({
      url: '/api_call',
      type: 'post',
      data: data
    }).done(function(res){
      res.words.map(function(word,i) {
        if( i === res.words.length - 1){
          var newForm = `<fieldset>
          <h2 class="fs-title">Questions for ${word.toLowerCase()}</h2>

            <input class='check' type="checkbox"><p>Please document the exact plating procedure</p>
            <input type="text" name="notes" placeholder="Notes" />
            <input class='check' type="checkbox"><p>What membrane material was used during the transfer process</p>
            <input type="text" name="notes" placeholder="Notes" />
            <input class='check' type="checkbox"><p>Detail the precise application of siRNA for the knockdown</p>
            <input type="text" name="notes" placeholder="Notes" />
            <br>
            Additional notes:
            <input type="text" name="notes" placeholder="Notes" />
            <input type="button" name="previous" class="previous action-button" value="Previous" />
            <input type="button" name="submit" class="submit action-button" value="Submit" />
          </fieldset>`
        } else {
          var newForm = `<fieldset>
          <h2 class="fs-title">Questions for ${word.toLowerCase()}</h2>

          <input class='check' type="checkbox"><p>Please document the exact plating procedure</p>
          <input type="text" name="notes" placeholder="Notes" />
          <input class='check' type="checkbox"><p>What membrane material was used during the transfer process</p>
          <input type="text" name="notes" placeholder="Notes" />
          <input class='check' type="checkbox"><p>Detail the precise application of siRNA for the knockdown</p>
          <br>
          Additional notes:<input type="text" name="notes" placeholder="Notes" />
          <input type="button" name="previous" class="previous action-button" value="Previous" />
          <input type="button" name="next" class="next action-button" value="Next" />
          </fieldset>`
        }

        $('#progressbar').append(`<li class='prog' style='width: ${$('#progressbar').width()/res.words.length}px'>${word}</li>`);
        // debugger
        $('#msform').append(newForm);
      });

      $('.prog:first-child').addClass('active');
      // $('body').append('<p>' + res.words + '</p>')
    })
  })
})
