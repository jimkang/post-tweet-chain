var callNextTick = require('call-next-tick');

function postTweetChain(opts, done) {
  var twit;
  var parts;

  if (opts) {
    twit = opts.twit;
    parts = opts.parts;
  }

  postNextTweet(null, done);

  function postNextTweet(lastTweet, done) {
    var text = '';
    if (parts.length < 1) {
      callNextTick(done);
    }

    while (parts.length > 0) {
      if (text.length + parts[0].length + 1 < 141) {
        if (text.length > 0) {
          text += ' ';
        }
        else if (lastTweet) {
          text += '> ';
        }
        
        text += parts[0];
        parts.shift();
      }
      else {
        break;
      }
    }

    var body = {
      status: text
    };

    if (lastTweet) {
      body.in_reply_to_status_id = lastTweet.id_str;
    }

    var nextCallback = done;
    if (parts.length > 0) {
      nextCallback = callPostNextTweet;
    }

    twit.post('statuses/update', body, nextCallback);

    // This function saves the context, `parts` in particular.
    function callPostNextTweet(error, lastTweet) {
      if (error) {
        callNextTick(done, error);
      }
      else {
        postNextTweet(lastTweet, done);
      }
    }
  }
}

module.exports = postTweetChain;
