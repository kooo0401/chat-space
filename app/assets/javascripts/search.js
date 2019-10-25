$(function() {

  let search_list = $("#user-search-result");
  let selected_list = $(".chat-group-form__field--rightdesu");

  function appendList(user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    search_list.append(html)
  }
  function appendUser(user_id, user_name) {
    let html = `<div class='chat-group-users js-add-user'>
                  <div class='chat-group-user clearfix js-chat-member' id='${user_id}'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                      <p class='chat-group-user__name'>${user_name}</p>
                      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>  
                  </div>
                </div>`
    selected_list.append(html)
  }

  function appendErrMsgToHTML(msg) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty()
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          console.log(user)
          appendList(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    })
  });
  $(document).on('click','.user-search-add', function(){
    $('#chat-group-users').val();
    let user_id = $(this).data('user-id');
    let user_name = $(this).data('user-name');
    appendUser(user_id, user_name);
    $(this).parent().remove();
  });
  
  $(document).on('click','.user-search-remove', function(){
    $(this).parent().remove();
  });
});
