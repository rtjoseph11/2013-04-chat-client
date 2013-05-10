$(document).ready(function(){
  var chatInterval = setInterval(function(){
    if(room){
      getMessages();
    }
  }, 500);
  $('#sendMessage').on('click', function(){
    if (room){
      sendMessage($('#messageText').val(), window.location.search.slice(10));
    } else {
      alert('please join a room!');
    }
  });
  $('#messageText').on('keyup', function(event){
    if (room){
      if (event.which === 13){
        sendMessage($('#messageText').val(), window.location.search.slice(10));
      }
    } else {
      alert('please join a room!');
    }
  });
  $('#join').on('click', function(){
    room = prompt('what chat room do you want to join?');
    $('#main h2').text('Chat Room: ' + room);
    $('li').remove();
    $('#join').text('change room');
    messages = [];
    friends = {};
  });
});