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
//Meteor.call('searchTwitter', "#testeteste");
        T.get('search/tweets', { q: term, count: 200 },
              Meteor.bindEnvironment(
               function(err, data, response) {
                    console.log(data);
                    data.statuses.forEach(function(i){Tweets.insert(i);});
                  },
               function( error) {console.log( error);})
              );
    },
});
