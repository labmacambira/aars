Meteor.methods({
    updateStream: function() {
        termos=Configs.find({campo:"termos"}).fetch()[0].termos;
        streama="";
        termos.forEach(function(i){
            bar=((i===termos[termos.length-1]) ? "" : "," );
            streama+=i+bar;
        });
        delete stream;
        stream = T.stream('statuses/filter', { track: streama });

        stream.on('tweet',  Meteor.bindEnvironment(
                    function (tweet) {
                  console.log(tweet);
                  Tweets.insert({tweet:tweet, termos:termos})
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
