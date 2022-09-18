/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {


  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {

    let tweetMessage = `<p>${escape(tweet.content.text)}</p>`;
    let user = tweet.user.name;
    let handle = tweet.user.handle;
    let datePosted = timeago.format(tweet.created_at);
    let avatar = tweet.user.avatars;

    let $tweet = $(`<article>
                      <header>
                        <span>
                          <div>
                            <img src="${avatar}">
                            <span>${user}</span>
                          </div>
                          <div>${handle}</div>
                        </span>
                      </header>
                      <div>
                        ${tweetMessage}
                      </div>
                      <footer>
                        <p>${datePosted}</p>
                        <div>
                          <i class="fa-solid fa-flag"></i>
                          <i class="fa-solid fa-retweet"></i>
                          <i class="fa-solid fa-heart"></i>
                        </div>
                      </footer>
                      </article>
                      <br>`);

    return $tweet;

  };

  const renderTweets = function (tweets) {
    $(".tweets-container").empty();
    for (let i = 0; i < tweets.length; i++) {
      $(".tweets-container").prepend(createTweetElement(tweets[i]));
    }
  };

  // New Tweet Event Listener
  $('.tweet-form').on('submit', function (event) {
    event.preventDefault()

    // Form Validation
    if (!$("textarea").val()) {
      // Display Error
      $("#invalid-error").slideDown(1000);
    } else if ($("textarea").val().length > 140) {
      // Display Error
      $("#length-error").slideDown(1000);
    } else {

      const data = $(this).serialize()
      $.post("/tweets", data)
        .then(() => {
          loadTweets();
        })
    }
  });

  const loadTweets = function () {

    $.get("/tweets")
      .then((data) => {
        renderTweets(data);
      });
  };

  loadTweets();

});