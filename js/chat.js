$(document).ready(function(){
  var chatInterval = setInterval(function(){
    if(room){
      getMessages();
    }
  }, 500);
  $('#sendMessage').on('click', function(){
    if (room && $('#messageText').val()){
      sendMessage($('#messageText').val(), window.location.search.slice(10));
    }
  });
  $('#messageText').on('keyup', function(event){
    if (room && $('#messageText').val()){
      if (event.which === 13){
        sendMessage($('#messageText').val(), window.location.search.slice(10));
      }
    }
  });
  $('#join').on('click', function(){
    room = prompt('what chat room do you want to join?');
    $('#main h2').text('Chat Room: ' + room);
    $('li').remove();
    $('#join').text('change room');
    date = new Date();
    date = date.toISOString();
    friends = {};
  });
});
