var test = require('tape');
var postTweetChain = require('../index');
var callNextTick = require('call-next-tick');

var testCases = [
  {
    parts: [
      'Here is a sentence that is 71 characters long it runs on and on and on',
      'Here is another sentence that is 60 characters long it, yes.',
      'This third sentence is shorter. It is 53 characters.'
    ],
    expectedTweetTexts: [
      'Here is a sentence that is 71 characters long it runs on and on and on ' +
      'Here is another sentence that is 60 characters long it, yes.',
      '> This third sentence is shorter. It is 53 characters.'
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Basic test', function basicTest(t) {
    var mockTwit = {
      post: checkPost
    };

    var opts = {
      twit: mockTwit,
      parts: testCase.parts
    };

    var postCount = 0;

    postTweetChain(opts, checkDone);

    function checkPost(path, body, done) {
      t.equal(
        body.status,
        testCase.expectedTweetTexts[postCount],
        'Status is correct.'
      );

      if (postCount > 0) {
        t.equal(
          body.in_reply_to_status_id,
          postCount - 1,
          'in_reply_to_status_id is correct.'
        );
      }

      var tweet = {
        id_str: postCount
      };

      postCount += 1;

      callNextTick(done, null, tweet);
    }

    function checkDone(error) {
      t.ok(!error, 'No error while chain tweeting.');
      t.equal(
        postCount,
        testCase.expectedTweetTexts.length,
        'Correct number of tweets were posted.'
      );
      t.end();
    }
  });
}
