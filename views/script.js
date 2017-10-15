$(document).ready(function(){

  $('.my_form').submit(function(e){
    e.preventDefault();
    var data = $(this).serialize();

    $.ajax({
      url: '/api_call',
      type: 'post',
      data: data
    }).done(function(res){
      res.words.map(function(word,i) {
        if( i === res.words.length - 1){
          var newForm = `<fieldset>
          <h2 class="fs-title">Questions for ${word}</h2>
          <h3 class="fs-subtitle">This is step 1</h3>
            <input type="button" name="next" class="next action-button" value="answer1" />
            <input type="button" name="next" class="next action-button" value="answer2" />
            <input type="button" name="next" class="next action-button" value="answer3" />
            <input type="button" name="next" class="next action-button" value="answer4" />
            <input type="button" name="previous" class="previous action-button" value="Previous" />
            <input type="button" name="submit" class="submit action-button" value="Submit" />

          </fieldset>`
        } else {
          var newForm = `<fieldset>
          <h2 class="fs-title">Questions for ${word}</h2>
          <h3 class="fs-subtitle">This is step 1</h3>
          <input type="button" name="next" class="next action-button" value="answer1" />
          <input type="button" name="next" class="next action-button" value="answer2" />
          <input type="button" name="next" class="next action-button" value="answer3" />
          <input type="button" name="next" class="next action-button" value="answer4" />
          <input type="button" name="previous" class="previous action-button" value="Previous" />
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
