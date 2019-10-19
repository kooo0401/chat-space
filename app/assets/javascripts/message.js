$(function(){

  function scrollBottom(){
    let target = $('#new_message').last();
    let position = target.offset().top + $('#new_message').scrollTop();
    $('#new_message').animate({
      scrollTop: position
    }, 300, 'swing');
  }

  function buildHTML(message){
    let image = (message.image.url)?`<img src=${message.image.url} class="lower-message__image">`:"";
    let html = '<div class="message-content">' +
                  '<div class="upper-message">' +
                    '<div class="upper-message__user-name">' +
                      message.user_name +
                    '</div>' +
                    '<div class="upper-message__date">' +
                      message.date +
                    '</div>' +
                  '</div>' +
                  '<div class="lower-message">' +
                    '<p class="lower-message__content">' +
                      message.content +
                    '</p>' +
                    '<div class="lower-message__image">' +
                      image +
                    '</div>' +
                  '</div>' +
                '</div>'
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
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
      $('#message_content').val('');
      $('.hidden').val('');
      $('.group-name').animate({ scrollTop: $('.group-name')[0].scrollHeight});
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(){
      $('input').prop('disabled', false);
    })
  })
})

