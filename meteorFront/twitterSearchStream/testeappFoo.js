Participantes = new Meteor.Collection("participantes");
Tweets= new Meteor.Collection("tweets");
Configs= new Meteor.Collection("configs");
//Configs.insert({campo:"termos",termos:["#testeteste","#participabr"]});

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
//    consumer_key:         'iub8wm03f4sI4EMvxgdoicwIe',
//    consumer_secret:      'wlMxqHGSKjrKjhTPhQtkdR9bUnK7sZyjgsUEEcxDlHqoJCHO4D', 
//    access_token:         '18882547-183eFHigoFCYlZDh4IUSkVtsF6WM0CbX6yvu0Ah3a',
//    access_token_secret:  'YrWWp3GNudB7rXgHaj6cokJyXM6SW3GUTmO1tqoIYv6Y9'
    consumer_key:         'kj0HQGII7R1tfsAXhUcq6g',
    consumer_secret:      'LApqUqsuZmndSmOOt6erb6t72fCEe9B4BzSKCVIg', 
    access_token:         '18882547-ZsbjCGH2XeCyAzxeCtVHAh1esPvKIiMWyarUyy1JX',
    access_token_secret:  'BkW7shEXmTm7i7R9HbnP3ljGRfadzA1TBZNhHnDbmBGol'
});

termos=Configs.find({campo:"termos"}).fetch()[0].termos
streama="";termos.forEach(function(i){if(i===termos[termos.length-1]){bar="";}else{bar=",";}streama+=i+bar;});
var stream = T.stream('statuses/filter', { track: streama });

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
