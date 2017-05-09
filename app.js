
var model = {
  playlistItems: [],
  browseItems: []
}


function discoverGames(callback) {

  // ask the API for games related to the keywords that are hardcoded into the URL
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'json_callback',
      url: 'http://www.giantbomb.com/api/releases',
      data: {
        format: "jsonp",
        api_key: "555a89bb8e2e7057011cef979452373c3100ed82",

      },
    success: function(data) {
      console.log(data.results)
      model.browseItems = data.results;
      callback(data);
    }
  });
}

function searchGames (query, callback) {
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'json_callback',
      url: 'http://www.giantbomb.com/api/search',
      data: {
        format: "jsonp",
        api_key: "555a89bb8e2e7057011cef979452373c3100ed82",
        query: query

      },
    success: function(data) {
      console.log(data.results)
      model.browseItems = data.results;
      callback(data);
    }
  });
}

function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // render watchlist items
  model.playlistItems.forEach(function(game) {
    var title = $("<h6></h6>").text(game.name);

  //   // movie poster
  //   var poster = $("<img></img>")
  //     .attr("src", api.posterUrl(movie))
  //     .attr("class", "img-responsive");
  //
    // "I watched it" button
    var button = $("<button></button>")
      .text("I watched it")
      .attr("class", "btn btn-danger")
      .click(function() {
        var index = model.playlistItems.indexOf(game);
        model.playlistItems.splice(index, 1);
        render();
      });

    // panel heading contains the title
    var panelHeading = $("<div></div>")
      .attr("class", "panel-heading")
      .append(title);

    // panel body contains the poster and button
    var panelBody = $("<div></div>")
      .attr("class", "panel-body")
      .append( [button] );// include poster

    // list item is a panel, contains the panel heading and body
    var itemView = $("<li></li>")
      .append( [panelHeading, panelBody] )
      .attr("class", "panel panel-default");

    $("#section-watchlist ul").append(itemView);
  });

  // render browse items
  model.browseItems.forEach(function(game) {
    var title = $("<h4></h4>").text(game.name);
    var overview = $("<p></p>").text(game.deck);

    // button for adding to watchlist
    var button = $("<button></button>")
      .text("Add to Playlist")
      .attr("class", "btn btn-primary")
      .click(function() {
        model.playlistItems.push(game);
        render();
      })
      // .prop("disabled", model.watchlistItems.indexOf(movie) !== -1)
      .attr("class", "btn btn-primary");

    var itemView = $("<li></li>")
      .attr("class", "list-group-item")
      .append( [title, overview, button] );

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });
}

$(document).ready(function() {
  discoverGames(render);
});
