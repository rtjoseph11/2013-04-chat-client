var date;
var friends = {};
var room = '';
var sendMessage = function(input, username){
  $.ajax('https://api.parse.com/1/classes/messages', {
    contentType: 'application/json',
    data: '{"username": "' + username + '", "text": "' + input + '", "roomname": "' + room + '"}',
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
  $.ajax('https://api.parse.com/1/classes/messages', {
    contentType: 'application/json',
    data: {'where' : '{"createdAt":{"$gt":{"__type":"Date", "iso" :"' + date + '"}}}', 'order': 'createdAt'},
    success: function(data){
      for (var i = 0; i < data.results.length; i++){
        var anchor = data.results[i].username;
        var message = ' (' +jQuery.timeago(data.results[i].createdAt) + '): ' + data.results[i].text;
        var $a = $('<a href="#"></a>').text(anchor).addClass(anchor).on('click', function(e){
          e.preventDefault();
          var name = '.' + $(this).text();
          $(name).parent().toggleClass('friend');
          friends[anchor] = true;
        });
        var $li = $('<li></li>').text(message).prepend($a);
        if (friends[anchor]){
          $li.addClass('friend');
        }
       $('#main ul').append($li);
       $('#main ul').animate({ scrollTop: $('ul').prop("scrollHeight") - $('ul').height() }, 1);
      }
      if(data.results.length){
        date = data.results[data.results.length - 1].createdAt;}
    },
    error: function(data) {
      console.log('message request failed');
    }
  });
};