$(document).ready(function() {

  const tweetText = document.getElementById('tweet-text');

  tweetText.addEventListener('input', function() {

    const charsLeft = (140 - this.value.length);

    const counter = $(this).parent().find('.counter');
    counter[0].innerHTML = charsLeft;

    if (charsLeft < 0) {
      counter.addClass('red-counter');
    }

    if (charsLeft >= 0) {
      counter.removeClass('red-counter');
    }

  });

});
