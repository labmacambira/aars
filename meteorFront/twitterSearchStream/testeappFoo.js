Participantes = new Meteor.Collection("participantes");
Tweets= new Meteor.Collection("tweets");

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to testeappFoo.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
//var twitter = new TwitterApi();
//Meteor.methods({
//    searchTwitter: function(term) {
//        return twitter.search(term);
//    }
//});
var T = new TwitMaker({
    consumer_key:         'iub8wm03f4sI4EMvxgdoicwIe',
    consumer_secret:      'wlMxqHGSKjrKjhTPhQtkdR9bUnK7sZyjgsUEEcxDlHqoJCHO4D', 
    access_token:         '18882547-183eFHigoFCYlZDh4IUSkVtsF6WM0CbX6yvu0Ah3a',
    access_token_secret:  'YrWWp3GNudB7rXgHaj6cokJyXM6SW3GUTmO1tqoIYv6Y9'
});

var stream = T.stream('statuses/filter', { track: '#testeteste2' });

stream.on('tweet', function (tweet) {
  console.log(tweet);
});


Meteor.methods({
    searchTwitter: function(term) {
    T.get('search/tweets', { q: term, count: 100 },

Meteor.bindEnvironment(
 function(err, data, response) {
      console.log(data);
      Tweets.insert(data.statuses);
    },
function( error) {console.log( error);})
);
    },
});

  Meteor.startup(function () {
    // code to run on server at startup
//var T = new TwitMaker({
//    consumer_key:         'iub8wm03f4sI4EMvxgdoicwIe',
//    consumer_secret:      'wlMxqHGSKjrKjhTPhQtkdR9bUnK7sZyjgsUEEcxDlHqoJCHO4D', 
//    access_token:         '18882547-183eFHigoFCYlZDh4IUSkVtsF6WM0CbX6yvu0Ah3a',
//    access_token_secret:  'YrWWp3GNudB7rXgHaj6cokJyXM6SW3GUTmO1tqoIYv6Y9'
//});



  });
}
