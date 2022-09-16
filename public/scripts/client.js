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


  const createTweetElement = function (tweet) {

    let tweetMessage = tweet.content.text;
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
                      <p>
                        ${tweetMessage}
                      </p>
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
    // loops through tweets
    for (let i = 0; i < tweets.length; i++) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $(".tweets-container").append(createTweetElement(tweets[i]));
    }
  };

  // New Tweet Event Listener
  $('.tweet-form').on('submit', function (event) {
    event.preventDefault()
    const data = $(this).serialize()

    // Form Validation
    if (data === "" || data === null) {
      alert("Invalid submission");
    } else if (data.length > 140) {
      alert("Tweet must not exceed 140 characters");
    } else {
      $.post("/tweets", data)
      .then(() => {
        console.log("Post complete!");
        console.log("data:", data);
        loadTweets();
      })
    }

  });

  const loadTweets = function () {

    // fetch tweets from tweets page
    // use jquery to make a GET request to /tweets
    // receive an array of tweets as JSON 
  
      $.get("/tweets")
        .then((data) => {
          // console.log("data:", data)
          renderTweets(data);
        });
  };

  loadTweets();

});