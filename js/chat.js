$(document).ready(function(){
  var messages = [];
  var friends = {};
  var sendMessage = function(input, username){
    $.ajax('https://api.parse.com/1/classes/tuckertest1', {
      contentType: 'application/json',
      data: '{"date": "-createdAt", "username": "' + username + '", "text": "' + input + '"}',
      type: 'POST',
      success: function(data){
        $('#messageText').val('');
        console.log('message sent!');
      },
      error: function(data){
        console.log('an error occured!', data);
      }
    });
  };
  var getMessages = function(){
    $.ajax('https://api.parse.com/1/classes/tuckertest1', {
      contentType: 'application/json',
      success: function(data){
        for (var i = messages.length; i < data.results.length; i++){
          var anchor = data.results[i].username;
          var message = ' (' +jQuery.timeago(data.results[i].createdAt) + '): ' + data.results[i].text;
          var $a = $('<a href="#"></a>').text(anchor).addClass(anchor).on('click', function(e){
            e.preventDefault;
            var name = '.' + $(this).text();
            $(name).parent().toggleClass('friend');
            friends[anchor] = true;
          });
          var $li = $('<li></li>').text(message).prepend($a);
          if (friends[anchor]){
            $li.addClass('friend');
          }
         $('#main ul').append($li);
        }
        messages = data.results;
      },
      error: function(data) {
        console.log('message request failed');
      }
    });
  };
  var chatInterval = setInterval(getMessages, 1000);
  $('#sendMessage').on('click', function(){
    sendMessage($('#messageText').val(), window.location.search.slice(10));
  });
  $('#messageText').on('keyup', function(event){
    if (event.which === 13){
      sendMessage($('#messageText').val(), window.location.search.slice(10));
    }
  });
});