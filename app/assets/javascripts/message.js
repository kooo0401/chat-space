$(function(){
  $(document).ready(function() { 

    function buildMessageHTML(message) {

      let image_url = (message.image)? `<image class="lower-message_image" src="${message.image}">`:"";
      let html = `<div class="message-content" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    ${image_url}
                  </div>`

      return(html);
    }

    function buildHTML(message){
      let image = (message.image.url)?`<img src=${message.image.url} class="lower-message__image">`:"";
      let html = `<div class="message-content" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <div class="lower-message__image">
                        ${image}
                      </div>
                    </div>
                  </div>`
      return html;
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      let formData = new FormData(this);
      let url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        let html = buildHTML(data);
        $('.group-name').append(html);
        $('form').get(0).reset();
        $('.group-name').animate({ scrollTop: $('.group-name')[0].scrollHeight});
      })
      .fail(function(){
        alert('エラーが発生したためメッセージは送信できませんでした。');
      })
      .always(function(){
        $('input').prop('disabled', false);
      return false;
      });
    });

    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    let reloadMessages = function() {
      let last_message_id = $(".message-content:last").data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        data: { id: last_message_id },
        dataType: 'json'
      })
      .done(function(messages) {
        let insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessageHTML(message)
          $('.group-name').append(insertHTML)
          $('.group-name').animate({scrollTop: $('.group-name')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function() {
        console.log('error');
      });
    };
    setInterval(reloadMessages, 5000);
    }
  });
});