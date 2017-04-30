
$(document).ready(function() {

  // send off the query
  $.ajax ({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: 'http://www.giantbomb.com/api/search/?format=jsonp&api_key=555a89bb8e2e7057011cef979452373c3100ed82&query=Witcher'
}).done(function(data) {
    console.log(data.results[1].name);
}).fail(function() {
  console.log(data)
  alert("error");
}).always(function() {
  alert("complete");
});
});
