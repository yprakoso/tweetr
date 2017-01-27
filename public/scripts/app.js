function renderTweets(tweets) {
  tweets.forEach(function(element) {
    $("#tweetsArea").prepend(createTweetElement(element));
  });
}

function createTweetElement(tweet) {
  //var $tweet = $('<article>').addClass('Alltweets');
  let username = tweet.user.handle;
  let avatar = tweet.user.avatars.small;
  let name = tweet.user.name
  let content = tweet.content.text;
  let time = tweet.created_at;
  let code = `
      <article id="allTweets">
        <header>
          <img class="avatar" src="${avatar}" >
            <h3 class="user">${name}</h3>
            <label class="username">${username}</label>
        </header>
        <p>${content}</p>
        <footer>
          <p>${time}</p>
        </footer>
      </article>
  `
  return code;
}

function displayTweets() {
  $.ajax('/tweets')
  .then((data) => {
    $('#tweetsArea').empty();
    renderTweets(data);
  });
}

function loadTweets(){
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: "GET"
  }).then(function(){
    displayTweets();
  })
}

loadTweets();

$(function() {
  $('form').on('submit', function(ev){
    ev.preventDefault();
    if ($('textarea')[0].value === "") {
      alert("You can't tweet empty tweet");
    } else if ($('textarea')[0].textLength > 140) {
      alert("You can't tweet more than 140 characters");
    } else {
      let dataTweets = $(this).serialize();
      $.ajax('/tweets', {method: "post", data: dataTweets})
      .then((result) => {
        $('textarea')[0].value = "";
        loadTweets();
      })
      .fail((error) => console.error(error))
    }
  });

  $('.compose').on('click', function(){
    $('.new-tweet').slideToggle(80, function() {
      if ($('.new-tweet').display !== "none") {
        $('textarea').focus();
      }
    });
  });
});

// renderTweets(data);