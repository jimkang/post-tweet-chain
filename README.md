post-tweet-chain
================

Posts text longer than 140 characters as a multi-tweet chain. Intended for use with with the Twitter API client [twit](https://www.npmjs.com/package/twit) or anything that implements its interface.

Installation
------------

    npm install post-tweet-chain

Usage
-----

    var postTweetChain = require('post-tweet-chain');
    var Twit = require('twit');
    
    var twit = new Twit({
      consumer_key:         '...',
      consumer_secret:      '...',
      access_token:         '...',
      access_token_secret:  '...'
    });

    var opts = {
      twit: twit,
      parts: [
        'Here is a sentence that is 71 characters long it runs on and on and on',
        'Here is another sentence that is 60 characters long it, yes.',
        'This third sentence is shorter. It is 53 characters.'
      ]
    };

    postTweetChain(opts, logDone);

    function logDone(error) {
      if (error) {
        console.log(error);
      }
      else {
        console.log('All done!');
      }
    }

This will post the following two tweets:

    Here is a sentence that is 71 characters long it runs on and on and on Here is another sentence that is 60 characters long it, yes.

    > This third sentence is shorter. It is 53 characters.

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
