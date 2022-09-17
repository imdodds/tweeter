/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const dataHelpers = require("../../server/lib/data-helpers");


$(document).ready(function () {

  /*
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  */

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
    // loops through tweets
    for (let i = 0; i < tweets.length; i++) {
      // calls createTweetElement for each tweet
      // takes return value and prepends it to the tweets container
      $(".tweets-container").prepend(createTweetElement(tweets[i]));
    }
  };

  // New Tweet Event Listener
  $('.tweet-form').on('submit', function (event) {
    event.preventDefault()

    // Form Validation
    if (!$("textarea").val()) {
      alert("Invalid submission");
    } else if ($("textarea").val().length > 140) {
      alert("Tweet must not exceed 140 characters");
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