function playQueue() {
  if ($('#song-queue').children().length === 0) {
    $('#message').html('Enter a song to play');
    $('#play-button').slideDown();
    return;
  }
  let firstSong = $('#song-queue').children(':first');
  let name = firstSong.children('.name').html();
  let notes = firstSong.children('.notes').html();
  if (!$('.repeat').hasClass('active')) {
    $('#song-queue').append(firstSong);
  } else {
    firstSong
    .append($('<button class="btn btn-xs delete">Delete</button>'))
    .append($('<button class="btn btn-xs requeue">Play Again</button>'));
    $('#played-queue').append(firstSong);
    addButtonEvents();
  }
  $('#message').html(`Now Playing ${name}`);
  $('#play-button').slideUp();
  let song = parseSong(notes);
  playSong(song, 300, playQueue);
}

function addMouseEvents() {
  $('li').mouseenter(function(event) {
    $(event.currentTarget).children('.notes').fadeIn(100);
  });

  $('li').mouseleave(function(event) {
    $(event.currentTarget).children('.notes').fadeOut(100);
  });
}

function addButtonEvents() {
  $('.requeue').click(function(event) {
    const song = $(event.currentTarget).parent();
    song.children('button').remove();
    $('#song-queue').append(song);
  });

  $('.delete').click(function(event) {
    $(event.currentTarget).parent().remove();
  });
}


$(document).ready(function() {

  $('#song-form').submit(function(event) {
    event.preventDefault();
    let name = $('<span class="name"></span>')
      .html($('input[name="name"]').val());
    let notes = $('<span class="notes"></span>')
      .html($('input[name="notes"]').val());
    let listElement = $('<li></li>')
      .append(name)
      .append($('<span> </span>'))
      .append(notes);
    $('#song-queue').append(listElement);
    $('input[type="text"]').val('');
    addMouseEvents();
  });

  $('#play-button').click(function(event) {
    playQueue();
  });

  $(document).keypress(function(event) {
    if (!$(event.target).is('input[type="text"]')) {
      playQueue();
    }
  })



});
