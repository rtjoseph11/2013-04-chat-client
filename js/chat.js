$(document).ready(function(){
  var sendMessage = function(input, username){
    $.ajax('https://api.parse.com/1/classes/tuckertest', {
      contentType: 'application/json',
      data: '{"username": "' + username + '", "text": "' + input + '"}',
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
    $.ajax('https://api.parse.com/1/classes/tuckertest', {
      contentType: 'application/json',
      success: function(data){
        for (var i = messages.length; i < data.results.length; i++){
          var message = data.results[i].username + ' (' +jQuery.timeago(data.results[i].createdAt) + '): ' + data.results[i].text;
          var $li = $('<li></li>').text(message);
         $('#main ul').append($li);
        }
        messages = data.results;
      },
      error: function(data) {
        console.log('message request failed');
      }
    });
  };
  var messages = [];
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