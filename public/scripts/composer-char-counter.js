$(document).ready(function() {
  // --- our code goes here ---

  console.log("Ready!");

  const tweetText = document.getElementById('tweet-text');

  tweetText.addEventListener('input', function() {

    const charsLeft = (140 - this.value.length);

    // console.log(event);
    // console.log(event.target.value.length);
    // console.log("this:", this);

    const counter = $(this).parent().find('.counter');
    counter[0].innerHTML = charsLeft;

    //console.log("this.counter:", $(this).filter("counter"));
    // console.log("Characters left:", charsLeft);

    if (charsLeft < 0) {
      counter.addClass('redCounter');
    }    

  });

});

