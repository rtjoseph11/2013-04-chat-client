$(document).ready(function(){
  $('#testGet').on('click', function(){
    console.log('running get');
    var $body = $('body');
    $.ajax('https://api.parse.com/1/classes/tuckertest', {
      contentType: 'application/json',
      success: function(data){
        $body.append(data.results[0].message);
      },
      error: function(data) {
        console.log('message request failed');
      }
    });
  });
  $('#testPost').on('click', function(){
    $.ajax('https://api.parse.com/1/classes/tuckertest', {
      contentType: 'application/json',
      data: '{"username": "tucker", "message": "hello World"}',
      type: 'POST',
      success: function(data){
        console.log('posted message succesfully');
      }
    });
  });
});