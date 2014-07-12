Meteor.methods({
    updateStream: function() {
        //termos=Configs.find({campo:"termos"}).fetch()[0].termos;
        termos=Termos.find().fetch();
        streama="";
        termos.forEach(function(i){
            bar=((i.termo===termos[termos.length-1].termo) ? "" : "," );
            streama+=i.termo+bar;
        });
        delete stream;
        console.log(streama);
        stream = T.stream('statuses/filter', { track: streama });

        stream.on('tweet',  Meteor.bindEnvironment(
            function (tweet) {
              console.log(tweet);
              insertTweet(tweet);
            })
        );
    },
    searchTwitter: function(term) {
      T.get('search/tweets', { q: term, count: 100 },
        Meteor.bindEnvironment(
          function(err, data, response) {
            data.statuses.forEach(function(i){
               insertTweet(i);
            });
            console.log("tdata escrito");
          },
          function( error) {console.log( error);})
      );
    },
});
